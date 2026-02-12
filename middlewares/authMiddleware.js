import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { sessionHelpers } from '../firestore/_index.js';
import { validationMiddleware } from './validationMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
const SESSION_INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

/**
 * Middleware to verify JWT and track persistent session activity
 */
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 1. Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // 2. Check Persistent Session Store (Firestore)
        const session = await sessionHelpers.getSession(token);
        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Session expired or invalid'
            });
        }

        const currentTime = Date.now();
        const timeSinceLastActivity = currentTime - session.lastActivity;

        if (timeSinceLastActivity > SESSION_INACTIVITY_LIMIT) {
            await sessionHelpers.deleteSession(token); // Cleanup
            return res.status(401).json({
                success: false,
                message: 'Session expired due to inactivity'
            });
        }

        // 3. Update last activity
        await sessionHelpers.updateActivity(token);
        req.user = decoded; // Attach user info to request

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validationMiddleware
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validationMiddleware
];

const resetPasswordValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
    validationMiddleware
];

const authMiddleware = {
    authenticate,
    registerValidation,
    loginValidation,
    resetPasswordValidation
};

export { authMiddleware };
