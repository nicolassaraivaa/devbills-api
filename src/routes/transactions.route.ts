import { Router } from "express";

import { ParamsType, validator } from "../middleweres/validator.middlewere";
import { createTransactionsSchema } from "../dtos/transactions.dto";
import { transactionsController } from "../controllers/transactionscontroller";
import { TransactionsFactory } from "../factories/transactions.factory";

export const transactionRoutes = Router()

const controller = new transactionsController(TransactionsFactory.getServiceInstance())

transactionRoutes.post('/', validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY
}), controller.create)

transactionRoutes.get('/', controller.index)

