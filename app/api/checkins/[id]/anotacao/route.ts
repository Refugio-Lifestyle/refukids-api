import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { CheckinEventoSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { NextRequest } from "next/server";
import z from "zod";

const RequestPostPayload = z
    .object({
        anotacao: z.string({ error: 'Campo anotação é obrigatório' }).min(10, 'Campo precisar ter no mínimo 10 caracteres').trim(),
        responsaveisNotificados: z.boolean()
    })

export const OpenAPICheckinsIdAnotacao: RouteConfig = {
    tags: ['Checkins'],
    summary: 'Salva um evento do checkin do tipo anotação',
    method: 'post',
    path: '/checkins/{id}/anotacao',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        }),
        body: {
            required: true,
            content: {
                'application/json': {
                    schema: RequestPostPayload
                }
            },
        }
    },
    responses: generateOpenAPIErrorsResponses(CheckinEventoSchema, {
        '400': ['Campo Id é obrigatório', 'Campos obrigatórios'],
        '404': ['Checkin não encontrado'],
        '500': ['Falha ao registrar a anotação'],
    })
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
        return Response.json({ error: payloadError?.message }, { status: 400 })
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

        return Response.json(evento)
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