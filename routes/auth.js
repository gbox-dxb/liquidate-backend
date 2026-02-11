import express from 'express';
const router = express.Router();

import { authController } from '../controllers/_index.js';
import { body } from 'express-validator';
import { validationMiddleware, authMiddleware } from '../middlewares/_index.js';

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

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        validationMiddleware
    ],
    authController.login
);

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


router.post('/logout', authMiddleware.authenticate, authController.logout);

const auth = router;
export { auth };
