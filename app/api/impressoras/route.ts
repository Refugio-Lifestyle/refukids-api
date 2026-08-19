import { prisma } from "@/lib/prisma"
import { ImpressoraSchema } from "@/prisma/generated/zod"
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers"
import { fotoZodValidacao, idZodValidacao, nomeZodValidacao } from "@/utils/validacoes"
import { RouteConfig } from "@asteasolutions/zod-to-openapi"
import { NextRequest } from "next/server"
import z from "zod"

export const OpenAPIImpressorasGet: RouteConfig = {
    tags: ['Impressoras'],
    summary: 'Busca todas as impressoras',
    method: 'get',
    path: '/impressoras',
    security: [{ BearerAuth: [] }],
    responses: generateOpenAPIErrorsResponses(z.array(ImpressoraSchema), {})
}

export async function GET(req: NextRequest) {
    let impressoras = await prisma.impressora.findMany({
        orderBy: {
            cadastradoEm: "asc"
        }
    })

    return Response.json(impressoras)
}


const RequestPostSchema = z
    .object({
        mac: idZodValidacao,
        modelo: idZodValidacao,
        tipo: idZodValidacao,
        foto: fotoZodValidacao,
        descricao: nomeZodValidacao,
    })

export const OpenAPIImpressorasPost: RouteConfig = {
    tags: ['Impressoras'],
    summary: 'Cadastra uma nova impressora',
    method: 'post',
    path: '/impressoras',
    security: [{ BearerAuth: [] }],
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: RequestPostSchema
                }
            }
        }
    },
    responses: generateOpenAPIErrorsResponses(ImpressoraSchema, {
        '400': ['Campos obrigatórios'],
        '500': ['Falha ao cadastrar a impressora']
    })
}

export async function POST(req: NextRequest) {
    const { data: payload, error: payloadError } = RequestPostSchema
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    try {
        let impressora = await prisma.impressora.create({
            data: {
                mac: payload.mac,
                modelo: payload.modelo,
                tipo: payload.tipo,
                foto: payload.foto,
                descricao: payload.descricao
            }
        })

        return Response.json(impressora)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao cadastrar a impressora' }, { status: 500 })
    }
} 