import { binanceExchange, bybitExchange, mexcExchange } from "../exchanges/_index.js";

const getExchange = (exchangeType) => {
    const exchanges = {
        binance: binanceExchange,
        bybit: bybitExchange,
        mexc: mexcExchange
    };
    const exchange = exchanges[exchangeType.toLowerCase()];
    if (!exchange) throw new Error(`Invalid exchange type: ${exchangeType}`);
    return exchange;
};

const exchangeService = {
    newOrder: async (exchangeType, params, environment) => await getExchange(exchangeType).newOrder(params, environment),
    modifyOrder: async (exchangeType, params, environment) => await getExchange(exchangeType).modifyOrder(params, environment),
    cancelOrder: async (exchangeType, params, environment) => await getExchange(exchangeType).cancelOrder(params, environment),
    cancelAllOpenOrders: async (exchangeType, params, environment) => await getExchange(exchangeType).cancelAllOpenOrders(params, environment),
    queryOrder: async (exchangeType, params, environment) => await getExchange(exchangeType).queryOrder(params, environment),
    queryOpenOrders: async (exchangeType, params, environment) => await getExchange(exchangeType).queryOpenOrders(params, environment),
    queryAllOrders: async (exchangeType, params, environment) => await getExchange(exchangeType).queryAllOrders(params, environment),
    getPositionRisk: async (exchangeType, params, environment) => await getExchange(exchangeType).getPositionRisk(params, environment),
    getAccountInformation: async (exchangeType, params, environment) => await getExchange(exchangeType).getAccountInformation(params, environment),
    getAccountBalance: async (exchangeType, params, environment) => await getExchange(exchangeType).getAccountBalance(params, environment),
    changeInitialLeverage: async (exchangeType, params, environment) => await getExchange(exchangeType).changeInitialLeverage(params, environment),
    changeMarginType: async (exchangeType, params, environment) => await getExchange(exchangeType).changeMarginType(params, environment),
    changePositionMode: async (exchangeType, params, environment) => await getExchange(exchangeType).changePositionMode(params, environment),
    getCurrentPositionMode: async (exchangeType, params, environment) => await getExchange(exchangeType).getCurrentPositionMode(params, environment),
    getIncomeHistory: async (exchangeType, params, environment) => await getExchange(exchangeType).getIncomeHistory(params, environment),
    getFundingRateHistory: async (exchangeType, params, environment) => await getExchange(exchangeType).getFundingRateHistory(params, environment),
    getExchangeInformation: async (exchangeType, params, environment) => await getExchange(exchangeType).getExchangeInformation(params, environment)
};

export { exchangeService };
