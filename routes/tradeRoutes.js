import express from 'express';
const router = express.Router();

import { tradeController } from '../controllers/_index.js';
import { tradeMiddleware } from '../middlewares/_index.js';

// Order routes
router.post('/order', tradeMiddleware.orderValidation, tradeController.newOrder);
router.put('/order', tradeMiddleware.orderValidation, tradeController.modifyOrder);
router.delete('/order', tradeMiddleware.orderValidation, tradeController.cancelOrder);
router.delete('/order/all', tradeMiddleware.orderValidation, tradeController.cancelAllOpenOrders);

// Query routes
router.get('/order', tradeMiddleware.queryValidation, tradeController.queryOrder);
router.get('/orders/open', tradeMiddleware.queryValidation, tradeController.queryOpenOrders);
router.get('/orders/all', tradeMiddleware.queryValidation, tradeController.queryAllOrders);

// Account/Risk routes
router.get('/risk', tradeMiddleware.accountValidation, tradeController.getPositionRisk);
router.get('/account', tradeMiddleware.accountValidation, tradeController.getAccountInformation);
router.get('/balance', tradeMiddleware.accountValidation, tradeController.getAccountBalance);

// Config routes
router.post('/leverage', tradeMiddleware.configValidation, tradeController.changeInitialLeverage);
router.post('/margin-type', tradeMiddleware.configValidation, tradeController.changeMarginType);
router.post('/position-mode', tradeMiddleware.configValidation, tradeController.changePositionMode);
router.get('/position-mode', tradeMiddleware.configValidation, tradeController.getCurrentPositionMode);

// Info routes
router.get('/income', tradeMiddleware.infoValidation, tradeController.getIncomeHistory);
router.get('/funding-rate', tradeMiddleware.infoValidation, tradeController.getFundingRateHistory);
router.get('/exchange-info', tradeMiddleware.infoValidation, tradeController.getExchangeInformation);

const tradeRoutes = router;
export { tradeRoutes };
