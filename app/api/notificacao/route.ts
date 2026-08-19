import { prisma } from "@/lib/prisma"
import { NotificacaoSchema } from "@/prisma/generated/zod"
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers"
import { RouteConfig } from "@asteasolutions/zod-to-openapi"
import { NextRequest } from "next/server"

export const OpenAPINotificacaoGet: RouteConfig = {
    tags: ['Notificacao'],
    summary: 'Busca detalhes de uma notificação do usuário',
    method: 'get',
    path: '/notificacao',
    security: [{ BearerAuth: [] }],
    responses: generateOpenAPIErrorsResponses(NotificacaoSchema, {
        '400': ['Campo id é obrigatório'],
        '404': ['Notificação não encontrada'],
    })
}

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    const notificacao = await prisma.notificacao.findFirst({
        where: { id }
    })

    if (!notificacao) {
        return Response.json({ error: 'Notificação não encontrada' }, { status: 404 })
    }

    return Response.json(notificacao)
}

export const OpenAPINotificacaoPut: RouteConfig = {
    tags: ['Notificacao'],
    summary: 'Marca uma notificação do usuário como lida',
    method: 'put',
    path: '/notificacao',
    security: [{ BearerAuth: [] }],
    responses: generateOpenAPIErrorsResponses(NotificacaoSchema, {
        '400': ['Campo id é obrigatório'],
    })
}

export async function PUT(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    try {
        const notificacao = await prisma.usuarioNotificacao.update({
            where: { id },
            data: { lida: true }
        })

        return Response.json(notificacao)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao marcar como lida a notificação do usuário' }, { status: 500 })
    }
}