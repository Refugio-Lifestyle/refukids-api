import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { NotificacaoSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { idZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextRequest } from "next/server";
import z from "zod";

export const OpenAPINotificacoesGet: RouteConfig = {
    tags: ['Notificacoes'],
    summary: 'Busca as notificações do usuário',
    method: 'get',
    path: '/notificacoes',
    security: [{ BearerAuth: [] }],
    request: {
        query: z.object({
            todasNotificacoes: z.boolean().optional()
        })
    },
    responses: generateOpenAPIErrorsResponses(z.array(NotificacaoSchema), {})
}

export async function GET(req: NextRequest) {
    const usuario = useUserToken(req)

    const notificacoes = await prisma.usuarioNotificacao.findMany({
        select: {
            id: true,
            lida: true,
            cadastradoEm: true,
            notificacao: {
                select: {
                    titulo: true,
                    descricao: true,
                    notificadoPor: {
                        select: {
                            nome: true,
                            foto: true
                        }
                    }
                }
            }
        },
        where: {
            lida: req.nextUrl.searchParams.has('todasNotificacoes') ? undefined : false,
            [usuario.realm_access?.roles.includes('servo') ? 'notificadoParaServo' : 'notificadoParaResponsavel']: { cpf: usuario.cpf }
        }
    })

    return Response.json(notificacoes)
}

const RequestPostSchema = z
    .object({
        token: idZodValidacao
    })

export const OpenAPINotificacoesPost: RouteConfig = {
    tags: ['Notificacoes'],
    summary: 'Salva o token de notificação do celular do usuário',
    method: 'post',
    path: '/notificacoes',
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
    responses: generateOpenAPIErrorsResponses(z.object(), {
        '400': ['Campos obrigatórios'],
        '404': ['Família não encontrada para o Usuário'],
        '500': ['Falha ao cadastrar o responsável']
    })
}

export async function POST(req: NextRequest) {
    const usuario = useUserToken(req)

    const { data: payload, error: payloadError } = z
        .object({
            token: idZodValidacao,
        })
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    try {
        if (usuario.realm_access?.roles.includes('servo')) {
            await prisma.servo.updateMany({
                data: { notificacoesToken: payload.token },
                where: { cpf: usuario.cpf }
            })
        }
        else {
            await prisma.responsavel.updateMany({
                data: { notificacoesToken: payload.token },
                where: { cpf: usuario.cpf }
            })
        }

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao registrar o token de notificação do dispositivo' }, { status: 500 })
    }
}

export const OpenAPINotificacoesPut: RouteConfig = {
    tags: ['Notificacoes'],
    summary: 'Marca todas as notificações do usuário como lida',
    method: 'put',
    path: '/notificacoes',
    security: [{ BearerAuth: [] }],
    responses: generateOpenAPIErrorsResponses(z.object(), {
        '500': ['Falha ao marcar como lida as notificações do usuário']
    })
}

export async function PUT(req: NextRequest) {
    const usuario = useUserToken(req)

    try {
        await prisma.usuarioNotificacao.updateMany({
            data: {
                lida: true
            },
            where: {
                [usuario.realm_access?.roles.includes('servo') ? 'notificadoParaServo' : 'notificadoParaResponsavel']: { cpf: usuario.cpf }
            }
        })

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao marcar como lida as notificações do usuário' }, { status: 500 })
    }
}