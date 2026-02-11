import apiClient, { signBinance } from '../utils/apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Binance Futures API Configuration
 * Documentation: https://developers.binance.com/docs/derivatives/usds-margined-futures/
 */
const API_VERSION = "/fapi/v1";

const BASE_URLS = {
    demo: "https://testnet.binancefuture.com",
    production: "https://fapi.binance.com"
};

const getCredentials = () => ({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
});

/**
 * Core request handler that prepends BASE_URL and API_VERSION
 * @param {string} method - HTTP method
 * @param {string} path - Relative endpoint path
 * @param {object} params - Request parameters
 * @param {string} environment - demo or production
 * @param {boolean} isPublic - Whether the endpoint requires signing
 */
const sendRequest = async (method, path, params = {}, environment = 'demo', isPublic = false) => {
    const baseUrl = BASE_URLS[environment] || BASE_URLS.demo;
    const fullPath = `${API_VERSION}${path}`;

    if (isPublic) {
        const queryStr = new URLSearchParams(params).toString();
        const url = `${baseUrl}${fullPath}${queryStr ? '?' + queryStr : ''}`;
        return await apiClient({ method, url });
    }

    const { apiKey, apiSecret } = getCredentials();
    const timestamp = Date.now();
    const queryParams = { ...params, timestamp };
    const queryStr = new URLSearchParams(queryParams).toString();
    const signature = signBinance(queryStr, apiSecret);

    const url = `${baseUrl}${fullPath}?${queryStr}&signature=${signature}`;

    return await apiClient({
        method,
        url,
        headers: { 'X-MBX-APIKEY': apiKey }
    });
};

export const newOrder = async (params, environment) => {
    return await sendRequest('POST', '/order', params, environment);
};

export const modifyOrder = async (params, environment) => {
    return await sendRequest('PUT', '/order', params, environment);
};

export const cancelOrder = async (params, environment) => {
    return await sendRequest('DELETE', '/order', params, environment);
};

export const cancelAllOpenOrders = async (params, environment) => {
    return await sendRequest('DELETE', '/allOpenOrders', params, environment);
};

export const queryOrder = async (params, environment) => {
    return await sendRequest('GET', '/order', params, environment);
};

export const queryOpenOrders = async (params, environment) => {
    return await sendRequest('GET', '/openOrders', params, environment);
};

export const queryAllOrders = async (params, environment) => {
    return await sendRequest('GET', '/allOrders', params, environment);
};

export const getPositionRisk = async (params, environment) => {
    return await sendRequest('GET', '/positionRisk', params, environment);
};

export const getAccountInformation = async (params, environment) => {
    return await sendRequest('GET', '/account', params, environment);
};

export const getAccountBalance = async (params, environment) => {
    return await sendRequest('GET', '/balance', params, environment);
};

export const changeInitialLeverage = async (params, environment) => {
    return await sendRequest('POST', '/leverage', params, environment);
};

export const changeMarginType = async (params, environment) => {
    return await sendRequest('POST', '/marginType', params, environment);
};

export const changePositionMode = async (params, environment) => {
    return await sendRequest('POST', '/positionSide/dual', params, environment);
};

export const getCurrentPositionMode = async (params, environment) => {
    return await sendRequest('GET', '/positionSide/dual', params, environment);
};

export const getIncomeHistory = async (params, environment) => {
    return await sendRequest('GET', '/income', params, environment);
};

export const getFundingRateHistory = async (params, environment) => {
    return await sendRequest('GET', '/fundingRate', params, environment);
};

export const getExchangeInformation = async (params, environment) => {
    return await sendRequest('GET', '/exchangeInfo', params, environment, true);
};
