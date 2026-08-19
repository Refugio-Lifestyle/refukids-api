import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { idZodValidacao, notificacoesCorpoZodValidacao, notificacoesTituloZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextRequest } from "next/server";
import { z } from "zod";

const RequestPostSchema = z
    .object({
        familiaId: idZodValidacao,
        titulo: notificacoesTituloZodValidacao,
        corpo: notificacoesCorpoZodValidacao
    })

export const OpenAPINotificarFamilia: RouteConfig = {
    tags: ['Notificar'],
    summary: 'Envia uma notificação para todos os responsáveis de uma familia',
    method: 'post',
    path: '/notificar/familia',
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
        '500': ['Falha ao enviar a notificação para todos os responsáveis de uma familia']
    })
}

export async function POST(req: NextRequest) {
    const usuario = useUserToken(req)

    const { data, error } = RequestPostSchema
        .safeParse(req.body)

    if (error) {
        return Response.json({ error: error.message }, { status: 400 })
    }

    try {
        const { familiaId, ...notificacaoPayload } = data

        const usuariosNotificados = await prisma.responsavel.findMany({
            where: { familiaId }
        })

        await notificarUsuario(usuario.cpf, usuariosNotificados, notificacaoPayload)

        return Response.json({})
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao enviar a notificação para todos os responsáveis de uma familia' }, { status: 500 })
    }

}
