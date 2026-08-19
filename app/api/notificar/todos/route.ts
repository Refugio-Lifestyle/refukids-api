import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { notificacoesCorpoZodValidacao, notificacoesTituloZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextRequest } from "next/server";
import { z } from "zod";

const RequestPostSchema = z
    .object({
        titulo: notificacoesTituloZodValidacao,
        corpo: notificacoesCorpoZodValidacao
    })

export const OpenAPINotificarTodos: RouteConfig = {
    tags: ['Notificar'],
    summary: 'Envia uma notificação para todos os usuários',
    method: 'post',
    path: '/notificar/todos',
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
        '500': ['Falha ao enviar a notificação para todos os usuários']
    })
}

export async function POST(req: NextRequest) {
    const usuario = useUserToken(req)

    const { data: notificacaoPayload, error } = z
        .object({
            titulo: notificacoesTituloZodValidacao,
            corpo: notificacoesCorpoZodValidacao
        })
        .safeParse(req.body)

    if (error) {
        return Response.json({ error: error.message }, { status: 400 })
    }

    try {
        const responsaveisNotificados = await prisma.responsavel.findMany()
        const servosNotificados = await prisma.servo.findMany()

        await notificarUsuario(usuario.cpf, [...responsaveisNotificados, ...servosNotificados], notificacaoPayload)

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao enviar a notificação para todos os usuários' }, { status: 500 })
    }

}
