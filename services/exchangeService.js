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
    newOrder: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).newOrder(params, APP_ENV),
    modifyOrder: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).modifyOrder(params, APP_ENV),
    cancelOrder: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).cancelOrder(params, APP_ENV),
    cancelAllOpenOrders: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).cancelAllOpenOrders(params, APP_ENV),
    queryOrder: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).queryOrder(params, APP_ENV),
    queryOpenOrders: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).queryOpenOrders(params, APP_ENV),
    queryAllOrders: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).queryAllOrders(params, APP_ENV),
    getPositionRisk: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getPositionRisk(params, APP_ENV),
    getAccountInformation: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getAccountInformation(params, APP_ENV),
    getAccountBalance: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getAccountBalance(params, APP_ENV),
    changeInitialLeverage: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).changeInitialLeverage(params, APP_ENV),
    changeMarginType: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).changeMarginType(params, APP_ENV),
    changePositionMode: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).changePositionMode(params, APP_ENV),
    getCurrentPositionMode: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getCurrentPositionMode(params, APP_ENV),
    getIncomeHistory: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getIncomeHistory(params, APP_ENV),
    getFundingRateHistory: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getFundingRateHistory(params, APP_ENV),
    getExchangeInformation: async (exchangeType, params, APP_ENV) => await getExchange(exchangeType).getExchangeInformation(params, APP_ENV)
};

export { exchangeService };
