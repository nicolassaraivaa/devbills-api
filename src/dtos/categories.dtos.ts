import { z } from "zod"

// Definição de um schema de validação para criação de categorias.
// O schema descreve como os dados devem ser validados.
export const createCategorySchema = {
    // O campo 'title' é obrigatório e deve ser uma string.
    title: z.string(),
    
    // O campo 'color' deve ser uma string que segue o formato de cor hexadecimal (#RRGGBB).
    // O regex /^#[A-Fa-f0-9]{6}$/ garante que a string comece com "#" seguido de 6 caracteres hexadecimais (0-9, A-F).
    color: z.string().regex(/^#[A-Fa-f0-9]{6}$/)
}

// Criação de um objeto Zod com o schema definido.
// O 'z.object()' transforma o schema em um validador que pode ser usado para validar dados.
const createdCategoryObject = z.object(createCategorySchema)

// Definição de um tipo TypeScript baseado no schema de validação.
// 'z.infer<typeof createdCategoryObject>' cria um tipo TypeScript automaticamente
// com base na definição do schema criado, ou seja, um tipo que representa os dados validados.
export type createCategoryDTO = z.infer<typeof createdCategoryObject>
