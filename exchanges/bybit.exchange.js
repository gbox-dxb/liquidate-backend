import { apiClient } from '../utils/apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

const API_VERSION = "/v5";

const BASE_URLS = {
    demo: "https://api-testnet.bybit.com",
    production: "https://api.bybit.com"
};

const getCredentials = () => ({
    apiKey: process.env.BYBIT_API_KEY,
    apiSecret: process.env.BYBIT_API_SECRET
});

const sendRequest = async (method, path, params = {}, APP_ENV = 'demo') => {
    const { apiKey, apiSecret } = getCredentials();
    const baseUrl = BASE_URLS[APP_ENV] || BASE_URLS.demo;
    const fullPath = `${API_VERSION}${path}`;
    const url = `${baseUrl}${fullPath}`;
    throw new Error("Bybit signing and request logic not fully implemented yet");
};

const bybitExchange = {
    newOrder: async (params, APP_ENV) => await sendRequest('POST', '/order/create', params, APP_ENV),
    getAccountBalance: async (params, APP_ENV) => await sendRequest('GET', '/account/wallet-balance', params, APP_ENV)
};

export { bybitExchange };
