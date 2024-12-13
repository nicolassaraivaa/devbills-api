"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
class Balance {
    constructor({ _id, balance, expenses, incomes }) {
        this._id = _id,
            this.incomes = incomes,
            this.expenses = expenses,
            this.balance = balance;
    }
}
exports.Balance = Balance;
