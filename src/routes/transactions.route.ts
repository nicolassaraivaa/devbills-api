import { Router } from "express";

import { ParamsType, validator } from "../middleweres/validator.middlewere";
import { createTransactionsSchema, getDashboardSchema, getFinancialEvolutionSchema, indexTransactionSchema } from "../dtos/transactions.dto";
import { transactionsController } from "../controllers/transactionscontroller";
import { TransactionsFactory } from "../factories/transactions.factory";

export const transactionRoutes = Router()

const controller = new transactionsController(TransactionsFactory.getServiceInstance())

transactionRoutes.post('/', 
    validator({
        schema: createTransactionsSchema,
        type: ParamsType.BODY
    }), 
    controller.create
)

transactionRoutes.get('/',
    validator({
        schema: indexTransactionSchema,
        type: ParamsType.QUERY
    }),
    controller.index
)

transactionRoutes.get(
    '/dashboard', 
    validator({
        schema: getDashboardSchema,
        type: ParamsType.QUERY
    }), 
    controller.getDashboard
)

transactionRoutes.get(
    '/financial-evolution', 
    validator({
        schema: getFinancialEvolutionSchema,
        type: ParamsType.QUERY
    }), 
    controller.getFinancialEvlution
)


