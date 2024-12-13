"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsType = void 0;
exports.validator = validator;
const zod_1 = require("zod");
const app_error_1 = require("../errors/app.error");
const http_status_codes_1 = require("http-status-codes");
// Enum para definir os tipos de parâmetros que o middleware pode validar (QUERY ou BODY).
var ParamsType;
(function (ParamsType) {
    ParamsType["QUERY"] = "query";
    ParamsType["BODY"] = "body"; // Para validação do corpo da requisição (req.body)
})(ParamsType || (exports.ParamsType = ParamsType = {}));
// Função middleware 'validator' que valida os parâmetros da requisição (query ou body).
function validator(params) {
    // Retorna uma função middleware que recebe os parâmetros req, res e next.
    return (req, res, next) => {
        // Cria um objeto Zod com o schema passado e tenta validar os dados no parâmetro especificado (req[params.type]).
        const result = zod_1.z.object(params.schema).safeParse(req[params.type]);
        // Se a validação falhar (result.success será falso), formata o erro e lança uma exceção personalizada.
        if (!result.success) {
            // Mapeia as issues de validação para formatá-las em uma string legível para o usuário.
            const errorFormatted = result.error.issues.map((item) => `${item.path.join('.')}: ${item.message}` // Exemplo de formatação: "body.title: Must be a string"
            );
            // Lança um erro personalizado com uma mensagem de erro formatada e o código de status HTTP 422 (Unprocessable Entity).
            throw new app_error_1.AppError(errorFormatted, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        }
        // Se a validação for bem-sucedida, atribui os dados validados de volta ao req[params.type] (body ou query).
        req[params.type] = result.data;
        // Chama o próximo middleware na cadeia.
        next();
    };
}
