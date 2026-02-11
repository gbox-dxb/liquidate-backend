import jwt from 'jsonwebtoken';
import { authController } from '../controllers/_index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
const SESSION_INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

/**
 * Middleware to verify JWT and track inactivity
 */
const authMiddleware = {
    authenticate
};

export { authMiddleware };
