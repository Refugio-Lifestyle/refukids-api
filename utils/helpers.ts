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
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateOpenAPIErrorResponse = (statusCode: number, description: string) => {
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: {
            error: z.string()
          }
        }
      }
    }
  }
}

export const generateOpenAPIPrismaErrorResponse = (statusCode: number, description: string) => {
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: {
            error: z.string(),
            prismaCode: z.number().nullable()
          }
        }
      }
    }
  }
}