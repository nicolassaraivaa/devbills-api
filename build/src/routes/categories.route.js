"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const categories_controllers_1 = require("../controllers/categories.controllers");
const validator_middlewere_1 = require("../middleweres/validator.middlewere");
const categories_dtos_1 = require("../dtos/categories.dtos");
const categories_factory_1 = require("../factories/categories.factory");
exports.categoriesRoutes = (0, express_1.Router)();
const controller = new categories_controllers_1.CategoriesController(categories_factory_1.CategoriesFactory.getServiceInstance());
exports.categoriesRoutes.get('/', controller.index);
exports.categoriesRoutes.post('/', (0, validator_middlewere_1.validator)({
    schema: categories_dtos_1.createCategorySchema,
    type: validator_middlewere_1.ParamsType.BODY
}), controller.create);
