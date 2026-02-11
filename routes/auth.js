import express from 'express';
const router = express.Router();

import { authController } from '../controllers/_index.js';
import { authMiddleware } from '../middlewares/_index.js';

router.post('/register', authMiddleware.registerValidation, authController.register);
router.post('/login', authMiddleware.loginValidation, authController.login);
router.post('/reset-password', authMiddleware.resetPasswordValidation, authController.resetPassword);
router.post('/logout', authMiddleware.authenticate, authController.logout);

const auth = router;
export { auth };
