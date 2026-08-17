import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { CheckinEventoSchema } from "@/prisma/zod";
import { generateOpenAPIErrorResponse, generateOpenAPIPrismaErrorResponse, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { NextRequest } from "next/server";
import z from "zod";

const RequestPostPayload = z
    .object({
        anotacao: z.string({ error: 'Campo anotação é obrigatório' }).min(10, 'Campo precisar ter no mínimo 10 caracteres').trim(),
        responsaveisNotificados: z.boolean()
    })

export const OpenAPICheckinIdAnotacao: RouteConfig = {
    method: 'post',
    path: '/api/checkins/{id}/anotacao',
    request: {
        params: z.object({
            id: z.string()
        }),
        body: {
            required: true,
            description: 'Registra uma anotação do checkin',
            content: {
                'application/json': {
                    schema: RequestPostPayload
                }
            },
        }
    },
    responses: {
        ...generateOpenAPIPrismaErrorResponse(400, 'Falha na operação do banco de dados'),
        ...generateOpenAPIErrorResponse(400, 'Campo Id é obrigatório'),
        ...generateOpenAPIErrorResponse(404, 'Checkin não encontrado'),
        ...generateOpenAPIErrorResponse(500, 'Falha ao registrar o acolhimento'),
        200: {
            description: 'Lista de posts',
            content: {
                'application/json': {
                    schema: CheckinEventoSchema
                }
            },
        }
    },
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const usuario = useUserToken(req)

    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo Id é obrigatório' }, { status: 400 })
    }

    const { data: payload, error: payloadError } = RequestPostPayload
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError.message })
    }

    let checkin = await prisma.checkin.findFirst({
        select: {
            crianca: {
                select: {
                    nome: true
                }
            },
            turma: {
                select: {
                    descricao: true
                }
            },
            eventos: {
                select: {
                    checkinPor: true
                },
                where: {
                    tipo: "Checkin"
                }
            }
        },
        where: { id }
    })

    if (!checkin) {
        return Response.json({ error: 'Checkin não encontrado' }, { status: 404 })
    }

    try {
        let evento = await prisma.checkinEvento.create({
            data: {
                tipo: "Anotacao",
                checkinId: id,
                anotadoPorId: usuario.cpf,
                anotacao: payload.anotacao,
                responsaveisNotificados: payload.responsaveisNotificados
            }
        })

        if (payload.responsaveisNotificados) {
            let nomeCrianca = checkin.crianca.nome.split(' ')
            await notificarUsuario(
                usuario.cpf,
                checkin.eventos.map(e => e.checkinPor!),
                { titulo: `Olá responsável por ${nomeCrianca}`, corpo: `${checkin.turma.descricao}: ${payload.anotacao}` }
            )
        }

        return Response.json({ data: evento })
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao registrar a anotação' }, { status: 500 })
    }
}