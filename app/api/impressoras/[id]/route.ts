import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { ImpressoraSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { nomeZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import moment from "moment";
import { NextRequest } from "next/server";
import z from "zod";

const RequestPutSchema = z
    .object({
        descricao: nomeZodValidacao
    })

export const OpenAPIImpressorasIdPut: RouteConfig = {
    tags: ['Impressoras'],
    summary: 'Atualiza os dados da impressora',
    method: 'put',
    path: '/impressoras/{id}',
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
    responses: generateOpenAPIErrorsResponses(ImpressoraSchema, {
        '400': ['Campo id é obrigatório', 'Campos obrigatórios'],
        '500': ['Falha ao atualizar a impressora']
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
        const impressora = await prisma.impressora
            .update({
                data: payload,
                where: { id }
            })

        return Response.json(impressora)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao atualizar a impressora' }, { status: 500 })
    }
}

export const OpenAPIImpressorasIdPatch: RouteConfig = {
    tags: ['Impressoras'],
    summary: 'Registra a impressora ao operador',
    method: 'patch',
    path: '/impressoras/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: generateOpenAPIErrorsResponses(ImpressoraSchema, {
        '400': ['Campo id é obrigatório'],
        '500': ['Falha ao registrar o operador']
    })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const usuario = useUserToken(req)

    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    try {
        const impressora = await prisma.impressora
            .update({
                data: {
                    ultimaConexaoEm: moment().toDate(),
                    operador: {
                        connect: {
                            cpf: usuario.cpf
                        }
                    }
                },
                where: { id }
            })

        return Response.json(impressora)
    } catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao registrar o operador' }, { status: 500 })
    }
}


export const OpenAPIImpressorasIdDelete: RouteConfig = {
    tags: ['Impressoras'],
    summary: 'Deleta a impressora',
    method: 'delete',
    path: '/impressoras/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: generateOpenAPIErrorsResponses(ImpressoraSchema, {
        '400': ['Campo id é obrigatório'],
        '500': ['Falha ao deletar a impressora']
    })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    try {
        await prisma.impressora
            .delete({ where: { id } })

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao deletar a impressora' }, { status: 500 })
    }
}
