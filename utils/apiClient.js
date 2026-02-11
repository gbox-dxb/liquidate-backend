import axios from 'axios';
import crypto from 'crypto';
import { logger } from './_index.js';

const apiClientInstance = axios.create({
    timeout: 10000,
});

apiClientInstance.interceptors.request.use((config) => {
    logger.info(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
}, (error) => {
    logger.error(`Request Error: ${error.message}`);
    return Promise.reject(error);
});

apiClientInstance.interceptors.response.use((response) => {
    logger.info(`Response: ${response.status} from ${response.config.url}`);
    return response.data;
}, (error) => {
    const status = error.response ? error.response.status : 'NETWORK_ERROR';
    const data = error.response ? JSON.stringify(error.response.data) : error.message;
    logger.error(`Response Error: ${status} - ${data}`);
    return Promise.reject(error);
});

export const signBinance = (queryString, secret) => {
    return crypto.createHmac('sha256', secret).update(queryString).digest('hex');
};

const apiClient = apiClientInstance;

export { apiClient };
