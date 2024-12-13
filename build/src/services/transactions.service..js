"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transactions_entity_1 = require("../entities/transactions.entity");
const app_error_1 = require("../errors/app.error");
const http_status_codes_1 = require("http-status-codes");
const balance_entity_1 = require("../entities/balance.entity");
class TransactionService {
    constructor(TransactionsRepository, CategoriesRepository) {
        this.TransactionsRepository = TransactionsRepository;
        this.CategoriesRepository = CategoriesRepository;
    }
    async create({ amount, categoryId, date, title, type }) {
        const category = await this.CategoriesRepository.findById(categoryId);
        if (!category) {
            throw new app_error_1.AppError('Category does not exists', http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const transaction = new transactions_entity_1.Transaction({
            title,
            amount,
            category,
            date,
            type
        });
        const createdTransaction = await this.TransactionsRepository.create(transaction);
        return createdTransaction;
    }
    async index(filters) {
        const transactions = await this.TransactionsRepository.index(filters);
        return transactions;
    }
    async getDashboard({ beginDate, endDate }) {
        let [balance, expenses] = await Promise.all([
            this.TransactionsRepository.getBalance({
                beginDate,
                endDate
            }),
            this.TransactionsRepository.getExpenses({
                beginDate,
                endDate
            })
        ]);
        if (!balance) {
            balance = new balance_entity_1.Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0
            });
        }
        return { balance, expenses };
    }
    async getFinancialEvolution({ year }) {
        const financialEvolution = await this.TransactionsRepository.getFinancialEvolution({ year });
        return financialEvolution;
    }
}
exports.TransactionService = TransactionService;
