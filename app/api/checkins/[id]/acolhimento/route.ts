import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { CheckinEventoSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Responsavel } from "@prisma/client";
import { NextRequest } from "next/server";
import z from "zod";

export const OpenAPICheckinsIdAcolhimento: RouteConfig = {
    tags: ['Checkins'],
    summary: 'Salva um evento do checkin do tipo acolhimento',
    method: 'post',
    path: '/checkins/{id}/acolhimento',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        }),
    },
    responses: generateOpenAPIErrorsResponses(CheckinEventoSchema, {
        '400': ['Campo Id é obrigatório'],
        '404': ['Checkin não encontrado'],
        '500': ['Falha ao registrar o acolhimento'],
    })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const usuario = useUserToken(req)

    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo Id é obrigatório' }, { status: 400 })
    }

    let checkin = await prisma.checkin.findFirst({
        select: {
            id: true,
            crianca: {
                select: {
                    nome: true
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
                tipo: "Acolhimento",
                checkinId: id,
                acolhidoPorId: usuario.cpf
            }
        })

        let nomeCrianca = checkin.crianca.nome.split(' ')
        await notificarUsuario(
            usuario.cpf,
            checkin.eventos.map(ev => ev.checkinPor!) as Responsavel[],
            { titulo: 'Acolhimento realizado', corpo: `Olá, ${nomeCrianca.shift()} acabou de ser acolhido em nossa salinha.` }
        )

        return Response.json(evento)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message, prismCode: error.code }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao registrar o acolhimento' }, { status: 500 })
    }
}