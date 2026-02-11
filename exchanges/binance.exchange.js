import apiClient, { signBinance } from '../utils/apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URLS = {
    demo: "https://testnet.binancefuture.com",
    production: "https://fapi.binance.com"
};

const getCredentials = () => ({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
});

const sendRequest = async (method, path, params = {}, environment = 'demo') => {
    const { apiKey, apiSecret } = getCredentials();
    const baseUrl = BASE_URLS[environment] || BASE_URLS.demo;

    const timestamp = Date.now();
    const queryParams = { ...params, timestamp };
    const queryStr = new URLSearchParams(queryParams).toString();
    const signature = signBinance(queryStr, apiSecret);

    const url = `${baseUrl}${path}?${queryStr}&signature=${signature}`;

    return await apiClient({
        method,
        url,
        headers: { 'X-MBX-APIKEY': apiKey }
    });
};

export const newOrder = async (params, environment) => {
    return await sendRequest('POST', '/fapi/v1/order', params, environment);
};

export const modifyOrder = async (params, environment) => {
    return await sendRequest('PUT', '/fapi/v1/order', params, environment);
};

export const cancelOrder = async (params, environment) => {
    return await sendRequest('DELETE', '/fapi/v1/order', params, environment);
};

export const cancelAllOpenOrders = async (params, environment) => {
    return await sendRequest('DELETE', '/fapi/v1/allOpenOrders', params, environment);
};

export const queryOrder = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/order', params, environment);
};

export const queryOpenOrders = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/openOrders', params, environment);
};

export const queryAllOrders = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/allOrders', params, environment);
};

export const getPositionRisk = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v2/positionRisk', params, environment);
};

export const getAccountInformation = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v2/account', params, environment);
};

export const getAccountBalance = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v2/balance', params, environment);
};

export const changeInitialLeverage = async (params, environment) => {
    return await sendRequest('POST', '/fapi/v1/leverage', params, environment);
};

export const changeMarginType = async (params, environment) => {
    return await sendRequest('POST', '/fapi/v1/marginType', params, environment);
};

export const changePositionMode = async (params, environment) => {
    return await sendRequest('POST', '/fapi/v1/positionSide/dual', params, environment);
};

export const getCurrentPositionMode = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/positionSide/dual', params, environment);
};

export const getIncomeHistory = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/income', params, environment);
};

export const getFundingRateHistory = async (params, environment) => {
    return await sendRequest('GET', '/fapi/v1/fundingRate', params, environment);
};

export const getExchangeInformation = async (params, environment) => {
    const baseUrl = BASE_URLS[environment] || BASE_URLS.demo;
    return await apiClient.get(`${baseUrl}/fapi/v1/exchangeInfo`);
};
