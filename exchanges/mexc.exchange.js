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

const sendRequest = async (method, path, params = {}, environment = 'demo') => {
    const { apiKey, apiSecret } = getCredentials();
    const baseUrl = BASE_URLS[environment] || BASE_URLS.demo;
    const fullPath = `${API_VERSION}${path}`;
    const url = `${baseUrl}${fullPath}`;
    throw new Error("MEXC signing and request logic not fully implemented yet");
};

const mexcExchange = {
    newOrder: async (params, environment) => await sendRequest('POST', '/order/submit', params, environment),
    getAccountBalance: async (params, environment) => await sendRequest('GET', '/account/asset', params, environment)
};

export { mexcExchange };
