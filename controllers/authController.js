import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userHelpers } from '../firestore/_index.js';


const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';


/**
 * In-memory session store to track last activity, Key: Token, Value: { email, lastActivity }
 */
const sessionStore = new Map();

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
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

const resetPassword = async (req, res, next) => {
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

const logout = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            sessionStore.delete(token);
        }

        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
};

const authController = {
    sessionStore,
    register,
    login,
    logout,
    resetPassword
};

export { authController };
