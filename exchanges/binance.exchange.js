import { apiClient, signBinance } from '../utils/apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

const API_VERSION = "/fapi/v1";

const BASE_URLS = {
    demo: "https://testnet.binancefuture.com",
    production: "https://fapi.binance.com"
};

const getCredentials = () => ({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
});

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

const binanceExchange = {
    newOrder: async (params, environment) => await sendRequest('POST', '/order', params, environment),
    modifyOrder: async (params, environment) => await sendRequest('PUT', '/order', params, environment),
    cancelOrder: async (params, environment) => await sendRequest('DELETE', '/order', params, environment),
    cancelAllOpenOrders: async (params, environment) => await sendRequest('DELETE', '/allOpenOrders', params, environment),
    queryOrder: async (params, environment) => await sendRequest('GET', '/order', params, environment),
    queryOpenOrders: async (params, environment) => await sendRequest('GET', '/openOrders', params, environment),
    queryAllOrders: async (params, environment) => await sendRequest('GET', '/allOrders', params, environment),
    getPositionRisk: async (params, environment) => await sendRequest('GET', '/positionRisk', params, environment),
    getAccountInformation: async (params, environment) => await sendRequest('GET', '/account', params, environment),
    getAccountBalance: async (params, environment) => await sendRequest('GET', '/balance', params, environment),
    changeInitialLeverage: async (params, environment) => await sendRequest('POST', '/leverage', params, environment),
    changeMarginType: async (params, environment) => await sendRequest('POST', '/marginType', params, environment),
    changePositionMode: async (params, environment) => await sendRequest('POST', '/positionSide/dual', params, environment),
    getCurrentPositionMode: async (params, environment) => await sendRequest('GET', '/positionSide/dual', params, environment),
    getIncomeHistory: async (params, environment) => await sendRequest('GET', '/income', params, environment),
    getFundingRateHistory: async (params, environment) => await sendRequest('GET', '/fundingRate', params, environment),
    getExchangeInformation: async (params, environment) => await sendRequest('GET', '/exchangeInfo', params, environment, true)
};

export { binanceExchange };
