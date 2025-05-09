import { Category } from "./category.entity"

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

type TransactionsProps = {
    _id?: string
    title: string
    amount: number
    date: Date
    category: Category
    type: TransactionType
}

export class Transaction {
    public _id?: string
    public amount: number
    public title: string
    public date: Date
    public category: Category
    public type: TransactionType

    constructor({_id, amount, category, date, type, title}:TransactionsProps) {
        this._id = _id
        this.amount = amount
        this.date = new Date(date)
        this.category = new Category(category)
        this.type = type
        this.title = title
    } 
}