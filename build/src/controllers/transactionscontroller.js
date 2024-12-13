"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsController = void 0;
const http_status_codes_1 = require("http-status-codes");
class transactionsController {
    constructor(TransactionService) {
        this.TransactionService = TransactionService;
        this.create = async (req, res, next) => {
            try {
                const { title, amount, categoryId, date, type } = req.body;
                const result = await this.TransactionService.create({ title, amount, categoryId, date, type });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.index = async (req, res, next) => {
            try {
                const { beginDate, categoryId, endDate, title } = req.query;
                const result = await this.TransactionService.index({ beginDate, categoryId, endDate, title });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.getDashboard = async (req, res, next) => {
            try {
                const { beginDate, endDate } = req.query;
                const result = await this.TransactionService.getDashboard({ beginDate, endDate });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.getFinancialEvlution = async (req, res, next) => {
            try {
                const { year } = req.query;
                const result = await this.TransactionService.getFinancialEvolution({ year });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.transactionsController = transactionsController;
