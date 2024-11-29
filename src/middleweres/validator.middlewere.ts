import { NextFunction, Request, Response } from "express"
import { z, ZodRawShape } from "zod"
import { AppError } from "../errors/app.error"
import { StatusCodes } from "http-status-codes"

// Enum para definir os tipos de parâmetros que o middleware pode validar (QUERY ou BODY).
export enum ParamsType {
    QUERY = 'query', // Para validação de parâmetros de query string na URL
    BODY = 'body' // Para validação do corpo da requisição (req.body)
}

// Tipo para definir os parâmetros de validação que o middleware aceitará.
// O tipo 'validateParams' inclui:
// - schema: um objeto de validação (definido com Zod)
// - type: o tipo de parâmetro que está sendo validado (QUERY ou BODY)
type validateParams = {
    schema: ZodRawShape, // O schema Zod para validar os dados
    type: ParamsType     // O tipo do parâmetro (QUERY ou BODY)
}

// Função middleware 'validator' que valida os parâmetros da requisição (query ou body).
export function validator(params: validateParams) {
    // Retorna uma função middleware que recebe os parâmetros req, res e next.
    return (req: Request, res: Response, next: NextFunction) => {
        // Cria um objeto Zod com o schema passado e tenta validar os dados no parâmetro especificado (req[params.type]).
        const result = z.object(params.schema).safeParse(req[params.type])
        
        // Se a validação falhar (result.success será falso), formata o erro e lança uma exceção personalizada.
        if (!result.success) {
            // Mapeia as issues de validação para formatá-las em uma string legível para o usuário.
            const errorFormatted = result.error.issues.map(
                (item) => `${item.path.join('.')}: ${item.message}` // Exemplo de formatação: "body.title: Must be a string"
            )

            // Lança um erro personalizado com uma mensagem de erro formatada e o código de status HTTP 422 (Unprocessable Entity).
            throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY)
        }
        
        // Se a validação for bem-sucedida, atribui os dados validados de volta ao req[params.type] (body ou query).
        req[params.type] = result.data

        // Chama o próximo middleware na cadeia.
        next()
    }
}
