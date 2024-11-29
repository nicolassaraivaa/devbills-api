import {CreateTransactionDTO} from '../dtos/transactions.dto'
import {IndexTransactionsDTO} from '../dtos/transactions.dto'
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { Transaction } from "../entities/transactions.entity";
import { CategoriesRepository } from '../database/repositories/categories.repository';
import { AppError } from '../errors/app.error';
import { StatusCodes } from 'http-status-codes';

export class TransactionService {
    constructor(
        private TransactionsRepository: TransactionsRepository, 
        private CategoriesRepository: CategoriesRepository
    ) {}
        
    async create({
        amount,
        categoryId,
        date,
        title,
        type
    }: CreateTransactionDTO): Promise<Transaction> {
        const category = await this.CategoriesRepository.findById(categoryId)

        if(!category){
            throw new AppError ('Category does not exists', StatusCodes.NOT_FOUND)
        }

        const transaction = new Transaction({
            title,
            amount,
            category,
            date,
            type
        })

        const createdTransaction = await this.TransactionsRepository.create(transaction)

        return createdTransaction
    }

    async index(filters: IndexTransactionsDTO): Promise<Transaction[]>{
        const transactions = await this.TransactionsRepository.index(filters)

        return transactions
    }
}