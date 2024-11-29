import { Router } from "express";

import { CategoriesController } from "../controllers/categories.controllers";
import { ParamsType, validator } from "../middleweres/validator.middlewere";
import { createCategorySchema } from "../dtos/categories.dtos";
import { CategoriesFactory } from "../factories/categories.factory";

export const categoriesRoutes = Router()

const controller = new CategoriesController(CategoriesFactory.getServiceInstance())

categoriesRoutes.get('/', controller.index)

categoriesRoutes.post('/', validator({
    schema: createCategorySchema,
    type: ParamsType.BODY
}), controller.create)
