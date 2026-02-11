import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    logger.error(`[ErrorHandler] ${status} - ${message}`);

    res.status(status).json({
        success: false,
        error: {
            status,
            message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};
