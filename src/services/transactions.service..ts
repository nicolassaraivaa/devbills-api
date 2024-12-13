import {CreateTransactionDTO, GetDashborardDTO, GetFinancialEvolutionDTO} from '../dtos/transactions.dto'
import {IndexTransactionsDTO} from '../dtos/transactions.dto'
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { Transaction } from "../entities/transactions.entity";
import { CategoriesRepository } from '../database/repositories/categories.repository';
import { AppError } from '../errors/app.error';
import { StatusCodes } from 'http-status-codes';
import { Balance } from '../entities/balance.entity';
import { Expense } from '../entities/expense.entity';

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

    async getDashboard({beginDate,endDate}:GetDashborardDTO): Promise<{balance: Balance, expenses: Expense[]}> {
        let [balance, expenses] = await Promise.all([
            this.TransactionsRepository.getBalance({
                beginDate,
                endDate
            }),
            this.TransactionsRepository.getExpenses({
                beginDate,
                endDate
            })
        ])

        if(!balance){
            balance = new Balance({
                _id: null,
                incomes:0,
                expenses: 0,
                balance: 0
            })
        }

        return {balance, expenses}
    }

    async getFinancialEvolution ({year} : GetFinancialEvolutionDTO):Promise <Balance[]> {
        const financialEvolution = await this.TransactionsRepository.getFinancialEvolution({year})

        return financialEvolution
    }
}