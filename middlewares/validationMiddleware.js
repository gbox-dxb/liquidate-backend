import { validationResult } from 'express-validator';

/**
 * Generic validation middleware to handle express-validator results
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.param || err.path,
                message: err.msg
            }))
        });
    }
    next();
};
