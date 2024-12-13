"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepository = void 0;
const transactions_entity_1 = require("../../entities/transactions.entity");
class TransactionsRepository {
    constructor(model) {
        this.model = model;
    }
    async create({ title, amount, category, date, type }) {
        const createdTransaction = await this.model.create({
            title,
            amount,
            category,
            date,
            type
        });
        return createdTransaction.toObject();
    }
    async index({ title, categoryId, beginDate, endDate }) {
        const whereParams = {
            ...(title && { title: { $regex: title, $options: 'i' } }),
            ...(categoryId && { 'category_id': categoryId })
        };
        if (beginDate || endDate) {
            whereParams.date = {
                ...(beginDate && { $gte: beginDate }),
                ...(endDate && { $lte: endDate })
            };
        }
        const transactions = await this.model.find(whereParams, undefined, {
            sort: {
                date: -1
            }
        });
        const transactionsMap = transactions.map(item => item.toObject());
        return transactionsMap;
    }
    async getBalance({ beginDate, endDate }) {
        const aggregate = this.model.aggregate();
        if (beginDate || endDate) {
            aggregate.match({
                date: {
                    ...(beginDate && { $gte: beginDate }),
                    ...(endDate && { $lte: endDate })
                },
            });
        }
        const [result] = await aggregate
            .project({
            _id: 0,
            income: {
                $cond: [
                    {
                        $eq: ["$type", "income"]
                    },
                    "$amount",
                    0
                ]
            },
            expense: {
                $cond: [
                    {
                        $eq: ["$type", "expense"]
                    },
                    "$amount",
                    0
                ]
            }
        })
            .group({
            _id: null,
            incomes: {
                $sum: "$income"
            },
            expenses: {
                $sum: "$expense"
            }
        })
            .addFields({
            balance: {
                $subtract: ["$incomes", "$expenses"]
            }
        });
        return result;
    }
    async getExpenses({ beginDate, endDate }) {
        const aggregate = this.model.aggregate();
        const matchParams = {
            type: transactions_entity_1.TransactionType.EXPENSE
        };
        if (beginDate || endDate) {
            matchParams.date = {
                ...(beginDate && { $gte: beginDate }),
                ...(endDate && { $lte: endDate })
            };
        }
        const result = await aggregate.match(matchParams).group({
            _id: '$category._id',
            title: {
                $first: '$category.title'
            },
            color: {
                $first: '$category.color'
            },
            amount: {
                $sum: '$amount'
            }
        });
        return result;
    }
    async getFinancialEvolution({ year }) {
        const aggregate = this.model.aggregate();
        const result = await aggregate
            .match({
            date: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`)
            }
        })
            .project({
            _id: 0,
            income: {
                $cond: [
                    {
                        $eq: ["$type", "income"]
                    },
                    "$amount",
                    0
                ]
            },
            expense: {
                $cond: [
                    {
                        $eq: ["$type", "expense"]
                    },
                    "$amount",
                    0
                ]
            },
            year: {
                $year: '$date'
            },
            month: {
                $month: '$date'
            }
        })
            .group({
            _id: ['$year', '$month'],
            incomes: {
                $sum: "$income"
            },
            expenses: {
                $sum: "$expense"
            }
        })
            .addFields({
            balance: {
                $subtract: ["$incomes", "$expenses"]
            }
        }).sort({
            _id: 1,
        });
        return result;
    }
}
exports.TransactionsRepository = TransactionsRepository;
