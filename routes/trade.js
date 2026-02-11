import express from 'express';
const router = express.Router();

import { tradeController } from '../controllers/_index.js';

// Order routes
router.post('/order', tradeController.newOrder);
router.put('/order', tradeController.modifyOrder);
router.delete('/order', tradeController.cancelOrder);
router.delete('/order/all', tradeController.cancelAllOpenOrders);

// Query routes
router.get('/order', tradeController.queryOrder);
router.get('/orders/open', tradeController.queryOpenOrders);
router.get('/orders/all', tradeController.queryAllOrders);

// Account/Risk routes
router.get('/risk', tradeController.getPositionRisk);
router.get('/account', tradeController.getAccountInformation);
router.get('/balance', tradeController.getAccountBalance);

// Config routes
router.post('/leverage', tradeController.changeInitialLeverage);
router.post('/margin-type', tradeController.changeMarginType);
router.post('/position-mode', tradeController.changePositionMode);
router.get('/position-mode', tradeController.getCurrentPositionMode);

// Info routes
router.get('/income', tradeController.getIncomeHistory);
router.get('/funding-rate', tradeController.getFundingRateHistory);
router.get('/exchange-info', tradeController.getExchangeInformation);

const trade = router;
export { trade };
