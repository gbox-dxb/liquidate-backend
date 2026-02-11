import { apiClient } from '../utils/apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

const API_VERSION = "/api/v1/contract";

const BASE_URLS = {
    demo: "https://contract.mexc.com",
    production: "https://contract.mexc.com"
};

const getCredentials = () => ({
    apiKey: process.env.MEXC_API_KEY,
    apiSecret: process.env.MEXC_API_SECRET
});

const sendRequest = async (method, path, params = {}, APP_ENV = 'demo') => {
    const { apiKey, apiSecret } = getCredentials();
    const baseUrl = BASE_URLS[APP_ENV] || BASE_URLS.demo;
    const fullPath = `${API_VERSION}${path}`;
    const url = `${baseUrl}${fullPath}`;
    throw new Error("MEXC signing and request logic not fully implemented yet");
};

const mexcExchange = {
    newOrder: async (params, APP_ENV) => await sendRequest('POST', '/order/submit', params, APP_ENV),
    getAccountBalance: async (params, APP_ENV) => await sendRequest('GET', '/account/asset', params, APP_ENV)
};

export { mexcExchange };
