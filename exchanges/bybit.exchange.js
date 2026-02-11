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

const sendRequest = async (method, path, params = {}, environment = 'demo') => {
    const { apiKey, apiSecret } = getCredentials();
    const baseUrl = BASE_URLS[environment] || BASE_URLS.demo;
    const fullPath = `${API_VERSION}${path}`;
    const url = `${baseUrl}${fullPath}`;
    throw new Error("Bybit signing and request logic not fully implemented yet");
};

const bybitExchange = {
    newOrder: async (params, environment) => await sendRequest('POST', '/order/create', params, environment),
    getAccountBalance: async (params, environment) => await sendRequest('GET', '/account/wallet-balance', params, environment)
};

export { bybitExchange };
