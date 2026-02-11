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
    newOrder,
    modifyOrder,
    cancelOrder,
    cancelAllOpenOrders,
    queryOrder,
    queryOpenOrders,
    queryAllOrders,
    getPositionRisk,
    getAccountInformation,
    getAccountBalance,
    changeInitialLeverage,
    changeMarginType,
    changePositionMode,
    getCurrentPositionMode,
    getIncomeHistory,
    getFundingRateHistory,
    getExchangeInformation
};

export { exchangeService };
