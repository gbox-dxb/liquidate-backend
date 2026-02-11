import { validationMiddleware } from './validationMiddleware.js';
import { authMiddleware } from './authMiddleware.js';

// Placeholders for trade-related validations
const orderValidation = [
    authMiddleware.authenticate,
    validationMiddleware
];

const queryValidation = [
    authMiddleware.authenticate,
    validationMiddleware
];

const accountValidation = [
    authMiddleware.authenticate,
    validationMiddleware
];

const configValidation = [
    authMiddleware.authenticate,
    validationMiddleware
];

const infoValidation = [
    authMiddleware.authenticate,
    validationMiddleware
];

const tradeMiddleware = {
    orderValidation,
    queryValidation,
    accountValidation,
    configValidation,
    infoValidation
};

export { tradeMiddleware };
