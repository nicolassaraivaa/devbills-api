import { CategoriesRepository } from "../database/repositories/categories.repository"
import { TransactionsRepository } from "../database/repositories/transactions.repository"
import { CategoryModel } from "../database/schemas/category.schema"
import { TransactionModel } from "../database/schemas/transactions.schema"
import { TransactionService } from "../services/transactions.service."

export class TransactionsFactory{
    private static TransactionService: TransactionService

    static getServiceInstance() {
        if (this.TransactionService){
            return this.TransactionService
        }
        const repository = new TransactionsRepository(TransactionModel)
        const cateforiesRepository = new CategoriesRepository(CategoryModel)
        const service = new TransactionService(repository, cateforiesRepository)

        this.TransactionService = service
        
        return service
    }
}