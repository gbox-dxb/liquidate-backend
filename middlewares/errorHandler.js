import { logger } from '../utils/_index.js';

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    logger.error(`[ErrorHandler] ${status} - ${message}`);

    res.status(status).json({
        success: false,
        error: {
            status,
            message,
            details: process.env.APP_ENV !== 'production' ? err.stack : undefined
        }
    });
};

export { errorHandler };
