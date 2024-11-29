import { createCategoryDTO } from "../dtos/categories.dtos";
import { CategoriesService } from "../services/categories.services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

     create = async (
        req: Request<unknown, unknown, createCategoryDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { color, title } = req.body

            const result = await this.categoriesService.create({ color, title })

            return res.status(StatusCodes.CREATED).json(result)
        } catch (err) {
            next(err)
        }
    }

     index = async(
        _: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.categoriesService.index()

            return res.status(StatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }

}