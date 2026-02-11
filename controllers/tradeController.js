import { exchangeService } from '../services/_index.js';

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

const tradeController = {
    handleTradeRequest,
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

export { tradeController };
