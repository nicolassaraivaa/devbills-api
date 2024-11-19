import { CategoriesRepository } from "../database/repositories/categories.repository";
import { createCategoryDTO } from "../dtos/categories.dtos";
import { Category } from "../entities/category.entity";

export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async create({color,title}: createCategoryDTO): Promise<Category> {
        const foundCategory = await this.categoriesRepository.findByTitle(title)

        const category = new Category({
            title,
            color 
        })

        const createdCategory = await this.categoriesRepository.create(category)
        
        return createdCategory
    }
}