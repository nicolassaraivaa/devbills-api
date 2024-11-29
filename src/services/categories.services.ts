import { StatusCodes } from "http-status-codes";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { createCategoryDTO } from "../dtos/categories.dtos";
import { Category } from "../entities/category.entity";
import { AppError } from "../errors/app.error";

export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) { }

     create = async ({ color, title }: createCategoryDTO): Promise<Category> => {
        const foundCategory = await this.categoriesRepository.findByTitle(title)

        if (foundCategory) {
            throw new AppError('Category alredy exists.', StatusCodes.BAD_REQUEST)
        }

        const category = new Category({
            title,
            color
        })

        const createdCategory = await this.categoriesRepository.create(category)

        return createdCategory
    }

    async index(): Promise<Category[]> {
        const categories = await this.categoriesRepository.index()

        return categories
    }
}