"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const validator_middlewere_1 = require("../middleweres/validator.middlewere");
const transactions_dto_1 = require("../dtos/transactions.dto");
const transactionscontroller_1 = require("../controllers/transactionscontroller");
const transactions_factory_1 = require("../factories/transactions.factory");
exports.transactionRoutes = (0, express_1.Router)();
const controller = new transactionscontroller_1.transactionsController(transactions_factory_1.TransactionsFactory.getServiceInstance());
exports.transactionRoutes.post('/', (0, validator_middlewere_1.validator)({
    schema: transactions_dto_1.createTransactionsSchema,
    type: validator_middlewere_1.ParamsType.BODY
}), controller.create);
exports.transactionRoutes.get('/', (0, validator_middlewere_1.validator)({
    schema: transactions_dto_1.indexTransactionSchema,
    type: validator_middlewere_1.ParamsType.QUERY
}), controller.index);
exports.transactionRoutes.get('/dashboard', (0, validator_middlewere_1.validator)({
    schema: transactions_dto_1.getDashboardSchema,
    type: validator_middlewere_1.ParamsType.QUERY
}), controller.getDashboard);
exports.transactionRoutes.get('/financial-evolution', (0, validator_middlewere_1.validator)({
    schema: transactions_dto_1.getFinancialEvolutionSchema,
    type: validator_middlewere_1.ParamsType.QUERY
}), controller.getFinancialEvlution);
