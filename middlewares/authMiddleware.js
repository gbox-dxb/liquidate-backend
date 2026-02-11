import jwt from 'jsonwebtoken';
import { authController } from '../controllers/_index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
const SESSION_INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

/**
 * Middleware to verify JWT and track inactivity
 */
const authenticate = (req, res, next) => {
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

        // 2. Check Session/Inactivity Store
        const session = authController.sessionStore.get(token);
        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Session expired or invalid'
            });
        }

        const currentTime = Date.now();
        const timeSinceLastActivity = currentTime - session.lastActivity;

        if (timeSinceLastActivity > SESSION_INACTIVITY_LIMIT) {
            authController.sessionStore.delete(token); // Cleanup
            return res.status(401).json({
                success: false,
                message: 'Session expired due to inactivity'
            });
        }

        // 3. Update last activity
        session.lastActivity = currentTime;
        req.user = decoded; // Attach user info to request

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

const authMiddleware = {
    authenticate
};

export { authMiddleware };
