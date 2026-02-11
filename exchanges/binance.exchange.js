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

const sendRequest = async (method, path, params = {}, APP_ENV = 'demo', isPublic = false) => {
    const baseUrl = BASE_URLS[APP_ENV] || BASE_URLS.demo;
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
    newOrder: async (params, APP_ENV) => await sendRequest('POST', '/order', params, APP_ENV),
    modifyOrder: async (params, APP_ENV) => await sendRequest('PUT', '/order', params, APP_ENV),
    cancelOrder: async (params, APP_ENV) => await sendRequest('DELETE', '/order', params, APP_ENV),
    cancelAllOpenOrders: async (params, APP_ENV) => await sendRequest('DELETE', '/allOpenOrders', params, APP_ENV),
    queryOrder: async (params, APP_ENV) => await sendRequest('GET', '/order', params, APP_ENV),
    queryOpenOrders: async (params, APP_ENV) => await sendRequest('GET', '/openOrders', params, APP_ENV),
    queryAllOrders: async (params, APP_ENV) => await sendRequest('GET', '/allOrders', params, APP_ENV),
    getPositionRisk: async (params, APP_ENV) => await sendRequest('GET', '/positionRisk', params, APP_ENV),
    getAccountInformation: async (params, APP_ENV) => await sendRequest('GET', '/account', params, APP_ENV),
    getAccountBalance: async (params, APP_ENV) => await sendRequest('GET', '/balance', params, APP_ENV),
    changeInitialLeverage: async (params, APP_ENV) => await sendRequest('POST', '/leverage', params, APP_ENV),
    changeMarginType: async (params, APP_ENV) => await sendRequest('POST', '/marginType', params, APP_ENV),
    changePositionMode: async (params, APP_ENV) => await sendRequest('POST', '/positionSide/dual', params, APP_ENV),
    getCurrentPositionMode: async (params, APP_ENV) => await sendRequest('GET', '/positionSide/dual', params, APP_ENV),
    getIncomeHistory: async (params, APP_ENV) => await sendRequest('GET', '/income', params, APP_ENV),
    getFundingRateHistory: async (params, APP_ENV) => await sendRequest('GET', '/fundingRate', params, APP_ENV),
    getExchangeInformation: async (params, APP_ENV) => await sendRequest('GET', '/exchangeInfo', params, APP_ENV, true)
};

export { binanceExchange };
