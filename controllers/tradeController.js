import { exchangeService } from '../services/_index.js';

const handleTradeRequest = (serviceMethod) => async (req, res, next) => {
    try {
        const { exchangeType, APP_ENV: requestEnv, params } = req.body;

        // Priority: Request Body (as APP_ENV) > process.env.APP_ENV > Default 'demo'
        const APP_ENV = requestEnv || process.env.APP_ENV || 'demo';

        if (!exchangeType) {
            return res.status(400).json({ success: false, error: 'exchangeType is required' });
        }

        const result = await exchangeService[serviceMethod](exchangeType, params || {}, APP_ENV);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

const tradeController = {
    newOrder: handleTradeRequest('newOrder'),
    modifyOrder: handleTradeRequest('modifyOrder'),
    cancelOrder: handleTradeRequest('cancelOrder'),
    cancelAllOpenOrders: handleTradeRequest('cancelAllOpenOrders'),
    queryOrder: handleTradeRequest('queryOrder'),
    queryOpenOrders: handleTradeRequest('queryOpenOrders'),
    queryAllOrders: handleTradeRequest('queryAllOrders'),
    getPositionRisk: handleTradeRequest('getPositionRisk'),
    getAccountInformation: handleTradeRequest('getAccountInformation'),
    getAccountBalance: handleTradeRequest('getAccountBalance'),
    changeInitialLeverage: handleTradeRequest('changeInitialLeverage'),
    changeMarginType: handleTradeRequest('changeMarginType'),
    changePositionMode: handleTradeRequest('changePositionMode'),
    getCurrentPositionMode: handleTradeRequest('getCurrentPositionMode'),
    getIncomeHistory: handleTradeRequest('getIncomeHistory'),
    getFundingRateHistory: handleTradeRequest('getFundingRateHistory'),
    getExchangeInformation: handleTradeRequest('getExchangeInformation')
};

export { tradeController };
