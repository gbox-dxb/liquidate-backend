import * as binance from "../exchanges/binance.exchange.js";
import * as mexc from "../exchanges/mexc.exchange.js";
import * as bybit from "../exchanges/bybit.exchange.js";

const exchanges = { binance, mexc, bybit };

const getExchange = (exchangeType) => {
    const exchange = exchanges[exchangeType.toLowerCase()];
    if (!exchange) throw new Error(`Invalid exchange type: ${exchangeType}`);
    return exchange;
};

export const newOrder = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).newOrder(params, environment);
};

export const modifyOrder = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).modifyOrder(params, environment);
};

export const cancelOrder = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).cancelOrder(params, environment);
};

export const cancelAllOpenOrders = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).cancelAllOpenOrders(params, environment);
};

export const queryOrder = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).queryOrder(params, environment);
};

export const queryOpenOrders = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).queryOpenOrders(params, environment);
};

export const queryAllOrders = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).queryAllOrders(params, environment);
};

export const getPositionRisk = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getPositionRisk(params, environment);
};

export const getAccountInformation = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getAccountInformation(params, environment);
};

export const getAccountBalance = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getAccountBalance(params, environment);
};

export const changeInitialLeverage = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).changeInitialLeverage(params, environment);
};

export const changeMarginType = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).changeMarginType(params, environment);
};

export const changePositionMode = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).changePositionMode(params, environment);
};

export const getCurrentPositionMode = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getCurrentPositionMode(params, environment);
};

export const getIncomeHistory = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getIncomeHistory(params, environment);
};

export const getFundingRateHistory = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getFundingRateHistory(params, environment);
};

export const getExchangeInformation = async (exchangeType, params, environment) => {
    return await getExchange(exchangeType).getExchangeInformation(params, environment);
};
