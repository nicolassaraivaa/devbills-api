"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor({ color, title, _id }) {
        this._id = _id;
        this.title = title;
        this.color = color.toUpperCase();
    }
}
exports.Category = Category;
