import { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import { PRISMA_ERROR_MESSAGES } from "./schema";

export const capitalizeWords = (palavra?: string) => palavra!.toLocaleLowerCase('pt-BR')
  .replace(/(^|\s)\S/g, l => l.toLocaleUpperCase('pt-BR'));

export const onlyNumbers = (palavra?: string) => palavra!.replace(/[^\d]+/g, '');

export function getPrismaErrorMessage(code?: string): string {
  if (!code) return 'Erro desconhecido.'

  return PRISMA_ERROR_MESSAGES[code] || 'Erro inesperado no banco de dados.'
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodType } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateOpenAPIErrorResponse = (
  statusCode: number,
  descriptions?: string | string[],
) => {
  const errors =
    typeof descriptions === 'string'
      ? [descriptions]
      : descriptions ?? []

  return {
    [statusCode]: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string(),
          }),
          examples: Object.fromEntries(
            errors
              .map((description, index) => [
                `Erro ${index + 1}`,
                {
                  summary: description,
                  value: {
                    error: description,
                  },
                },
              ]),
          ),
        },
      },
    } as ResponseConfig
  }
}

const DEFAULT_OPENAPI_ERRORS: Record<number, string[]> = {
  '400': ['Requisição inválida', 'Falha ao processar a requisição no Banco de dados'],
  '401': ['Token ausente'],
  '404': ['Recurso não encontrado'],
  '500': ['Erro interno do servidor']
}

export function generateOpenAPIErrorsResponses(returnSchema: ZodType, errors: Record<string, string[]>): {
  [statusCode: string]: ResponseConfig;
} {
  let responses = Object.entries(DEFAULT_OPENAPI_ERRORS)
    .map(([err, defaultMessages]) => {
      let messages = [
        ...defaultMessages,
        ...(errors[err] ?? [])
      ]

      return generateOpenAPIErrorResponse(Number(err), messages)
    })

  return {
    ...Object.assign({}, ...responses),
    200: {
      content: {
        'application/json': {
          schema: returnSchema
        }
      },
    }
  }
}