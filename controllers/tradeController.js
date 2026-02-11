import * as exchangeService from '../services/exchangeService.js';

export const handleTradeRequest = (serviceMethod) => async (req, res, next) => {
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

export const newOrder = handleTradeRequest('newOrder');
export const modifyOrder = handleTradeRequest('modifyOrder');
export const cancelOrder = handleTradeRequest('cancelOrder');
export const cancelAllOpenOrders = handleTradeRequest('cancelAllOpenOrders');
export const queryOrder = handleTradeRequest('queryOrder');
export const queryOpenOrders = handleTradeRequest('queryOpenOrders');
export const queryAllOrders = handleTradeRequest('queryAllOrders');
export const getPositionRisk = handleTradeRequest('getPositionRisk');
export const getAccountInformation = handleTradeRequest('getAccountInformation');
export const getAccountBalance = handleTradeRequest('getAccountBalance');
export const changeInitialLeverage = handleTradeRequest('changeInitialLeverage');
export const changeMarginType = handleTradeRequest('changeMarginType');
export const changePositionMode = handleTradeRequest('changePositionMode');
export const getCurrentPositionMode = handleTradeRequest('getCurrentPositionMode');
export const getIncomeHistory = handleTradeRequest('getIncomeHistory');
export const getFundingRateHistory = handleTradeRequest('getFundingRateHistory');
export const getExchangeInformation = handleTradeRequest('getExchangeInformation');
