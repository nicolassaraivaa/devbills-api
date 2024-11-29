import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionService } from "../services/transactions.service.";
import { CreateTransactionDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";

export class transactionsController {
    constructor(private TransactionService: TransactionService) { }

     create = async(
        req: Request<unknown, unknown, CreateTransactionDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title, amount, categoryId, date, type } = req.body

            const result = await this.TransactionService.create({ title, amount, categoryId, date, type })

            return res.status(StatusCodes.CREATED).json(result)
        } catch (err) {
            next(err)
        }
    }

    
    index = async(
        req: Request<unknown, unknown, unknown, IndexTransactionsDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {beginDate, categoryId, endDate, title} = req.query
            const result = await this.TransactionService.index({beginDate, categoryId, endDate, title})

            return res.status(StatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }
    
}