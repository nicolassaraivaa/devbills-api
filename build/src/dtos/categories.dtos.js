"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// Definição de um schema de validação para criação de categorias.
// O schema descreve como os dados devem ser validados.
exports.createCategorySchema = {
    // O campo 'title' é obrigatório e deve ser uma string.
    title: zod_1.z.string(),
    // O campo 'color' deve ser uma string que segue o formato de cor hexadecimal (#RRGGBB).
    // O regex /^#[A-Fa-f0-9]{6}$/ garante que a string comece com "#" seguido de 6 caracteres hexadecimais (0-9, A-F).
    color: zod_1.z.string().regex(/^#[A-Fa-f0-9]{6}$/)
};
// Criação de um objeto Zod com o schema definido.
// O 'z.object()' transforma o schema em um validador que pode ser usado para validar dados.
const createdCategoryObject = zod_1.z.object(exports.createCategorySchema);
