import express from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/_index.js';
import { validationMiddleware, authMiddleware } from '../middlewares/_index.js';

const router = express.Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        validationMiddleware
    ],
    authController.register
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        validationMiddleware
    ],
    authController.login
);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset user password
 * @access  Public
 */
router.post(
    '/reset-password',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('newPassword')
            .isLength({ min: 6 })
            .withMessage('New password must be at least 6 characters long'),
        validationMiddleware
    ],
    authController.resetPassword
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user and invalidate session
 * @access  Private
 */
router.post('/logout', authMiddleware.authenticate, authController.logout);

const auth = router;
export { auth };
