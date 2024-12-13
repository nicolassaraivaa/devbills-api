"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionType = void 0;
const category_entity_1 = require("./category.entity");
var TransactionType;
(function (TransactionType) {
    TransactionType["INCOME"] = "income";
    TransactionType["EXPENSE"] = "expense";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
class Transaction {
    constructor({ _id, amount, category, date, type, title }) {
        this._id = _id;
        this.amount = amount;
        this.date = new Date(date);
        this.category = new category_entity_1.Category(category);
        this.type = type;
        this.title = title;
    }
}
exports.Transaction = Transaction;
