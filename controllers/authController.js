import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userHelpers from '../firestore/userHelpers.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
const SESSION_INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

// In-memory session store to track last activity
// Key: Token, Value: { email, lastActivity }
export const sessionStore = new Map();

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userHelpers.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to Firestore
        await userHelpers.createUser({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Get user from Firestore
        const user = await userHelpers.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Initialize session activity
        sessionStore.set(token, {
            email,
            lastActivity: Date.now()
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Reset password
 */
export const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        // Check if user exists
        const user = await userHelpers.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update in Firestore
        await userHelpers.updateUserPassword(email, hashedNewPassword);

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        next(error);
    }
};
