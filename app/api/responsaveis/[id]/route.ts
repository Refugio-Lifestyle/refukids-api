import { prisma } from "@/lib/prisma";
import { ResponsavelSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { celulaZodValidacao, dataNascimentoZodValidacao, enderecoZodValidacao, fotoZodValidacao, nomeZodValidacao, parentescoZodValidacao, sexoZodValidacao, telefoneZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextRequest } from "next/server";
import { z } from "zod";

export const OpenAPIResponsaveisIdGet: RouteConfig = {
    tags: ['Responsaveis/Tio'],
    summary: 'Busca um responsável/tio',
    method: 'get',
    path: '/responsaveis/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: generateOpenAPIErrorsResponses(ResponsavelSchema, {
        '400': ['Campo id é obrigatório'],
        '404': ['Responsável/Tio não encontrado']
    })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    const responsavel = await prisma.responsavel.findFirst({
        where: { id }
    })

    if (!responsavel) {
        return Response.json({ error: 'Responsável/Tio não encontrado' }, { status: 404 })
    }

    return Response.json(responsavel)
}

const RequestPutSchema = z
    .object({
        nome: nomeZodValidacao,
        foto: fotoZodValidacao,
        sexo: sexoZodValidacao,
        telefone: telefoneZodValidacao,
        dataNascimento: dataNascimentoZodValidacao,
        parentesco: parentescoZodValidacao,
        endereco: enderecoZodValidacao,
        celula: celulaZodValidacao
    })

export const OpenAPIResponsaveisIdPut: RouteConfig = {
    tags: ['Responsaveis/Tio'],
    summary: 'Atualiza um responsável/tio',
    method: 'put',
    path: '/responsaveis/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: RequestPutSchema
                }
            }
        }
    },
    responses: generateOpenAPIErrorsResponses(ResponsavelSchema, {
        '400': ['Campo id é obrigatório', 'Campos obrigatórios'],
        '500': ['Falha ao atualizar o responsável']
    })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    const { data: payload, error: payloadError } = RequestPutSchema
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    try {
        const responsavel = await prisma.responsavel
            .update({
                data: payload,
                where: { id }
            })

        return Response.json(responsavel)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao atualizar o responsável' }, { status: 500 })
    }
}

export const OpenAPIResponsaveisIdDelete: RouteConfig = {
    tags: ['Responsaveis/Tio'],
    summary: 'Deleta um responsável/tio',
    method: 'delete',
    path: '/responsaveis/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: generateOpenAPIErrorsResponses(z.object(), {
        '400': ['Campo id é obrigatório'],
        '500': ['Falha ao deletar o responsável']
    })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    try {
        await prisma.responsavel
            .delete({ where: { id } })

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao deletar o responsável' }, { status: 500 })
    }
}

