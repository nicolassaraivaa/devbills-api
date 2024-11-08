import { CategoriesService } from "../services/categories.services";
import { Request, Response } from "express";

export class CategoriesController{
    async create(_: Request, res: Response) {
        const service = new CategoriesService()

        const result = await service.create()

        return res.status(201).json(result)
    }

}