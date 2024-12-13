import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionService } from "../services/transactions.service.";
import { CreateTransactionDTO, GetDashborardDTO, GetFinancialEvolutionDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";
import { BodyRequest, QueryRequest } from "./types";

export class transactionsController {
    constructor(private TransactionService: TransactionService) { }

     create = async(
        req: BodyRequest<CreateTransactionDTO>,
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
        req: QueryRequest<IndexTransactionsDTO>,
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

    getDashboard = async(
        req: QueryRequest<GetDashborardDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {beginDate, endDate} = req.query
            
            const result = await this.TransactionService.getDashboard({beginDate, endDate})

            return res.status(StatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }

    getFinancialEvlution = async(
        req: QueryRequest<GetFinancialEvolutionDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {year} = req.query
            
            const result = await this.TransactionService.getFinancialEvolution({year})

            return res.status(StatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }
}