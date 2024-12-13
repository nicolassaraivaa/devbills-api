"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor({ _id, amount, color, title }) {
        this._id = _id;
        this.amount = amount;
        this.color = color;
        this.title = title;
    }
}
exports.Expense = Expense;
