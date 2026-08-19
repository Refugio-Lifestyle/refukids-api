import { firebaseDb } from "@/lib/firebase";
import { prisma } from "@/lib/prisma";
import { ImpressaoSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { idZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { child, push, ref } from "firebase/database";
import { NextRequest } from "next/server";
import z from "zod";

const RequestPostPayload = z
    .object({
        impressoraId: idZodValidacao,
        checkinId: idZodValidacao
    })


export const OpenAPICheckinsIdImpressoes: RouteConfig = {
    tags: ['Checkins'],
    summary: 'Gera uma nova impressão do checkin',
    method: 'post',
    path: '/checkins/{id}/impressao',
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
    responses: generateOpenAPIErrorsResponses(ImpressaoSchema, {
        '400': ['Campo Id é obrigatório', 'Campos obrigatórios'],
        '404': ['Checkin não encontrado', 'Impressora não encontrada ou sem operador'],
        '500': ['Falha ao reimprimir o checkin'],
    })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    const { data: payload, error: payloadError } = RequestPostPayload
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    let checkin = await prisma.checkin.findFirst({
        select: {
            id: true,
            cadastradoEm: true,
            turma: {
                select: {
                    id: true,
                    descricao: true
                }
            },
            crianca: {
                select: {
                    id: true,
                    nome: true,
                    dataNascimento: true,
                    familia: {
                        select: {
                            responsaveis: {
                                select: { nome: true, telefone: true, celula: true },
                                where: { responsavelLegal: true }
                            }
                        }
                    }
                }
            }
        },
        where: {
            id: payload.checkinId
        }
    })

    if (!checkin) {
        return Response.json({ error: 'Checkin não encontrado' }, { status: 404 })
    }

    let impressora = await prisma.impressora.findFirst({
        select: {
            id: true,
            mac: true,
            tipo: true,
            descricao: true,
            operador: {
                select: {
                    cpf: true
                }
            },
        },
        where: {
            id: payload.impressoraId,
            operadorId: {
                not: null
            }
        }
    })

    if (!impressora) {
        return Response.json({ error: 'Impressora não encontrada ou sem operador' }, { status: 404 })
    }

    try {
        let impressao = await prisma.impressao.create({
            data: {
                checkinId: payload.checkinId,
                impressoraId: payload.impressoraId
            }
        })

        // Gera impressão do ticket
        let impressoesRef = ref(firebaseDb, `refukids/impressoes`)
        let impressoesOperadorRef = child(impressoesRef, impressora.operador!.cpf)
        await push(impressoesOperadorRef, {
            checkin: {
                id: checkin.id,
                cadastradoEm: checkin.cadastradoEm.getTime()
            },
            turma: checkin.turma,
            crianca: checkin.crianca,
            impressora
        })

        return Response.json(impressao)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao reimprimir o checkin' }, { status: 500 })
    }
}