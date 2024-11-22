import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { createCategoryDTO } from "../dtos/categories.dtos";
import { CategoriesService } from "../services/categories.services";
import { NextFunction, Request, Response } from "express";

export class CategoriesController {
    async create(
        req: Request<unknown, unknown, createCategoryDTO>, 
        res: Response,
        next: NextFunction
    ) {
        try {
            const { color, title } = req.body

            const repository = new CategoriesRepository(CategoryModel)
            const service = new CategoriesService(repository)

            const result = await service.create({ color, title })

            return res.status(201).json(result)
        } catch(err){ 
            next(err)
        }
    }

}