import { exchangeService } from '../services/_index.js';

const handleTradeRequest = (serviceMethod) => async (req, res, next) => {
    try {
        const { exchangeType, environment, params } = req.body;

        if (!exchangeType) {
            return res.status(400).json({ success: false, error: 'exchangeType is required' });
        }

        const result = await exchangeService[serviceMethod](exchangeType, params || {}, environment || 'demo');
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
