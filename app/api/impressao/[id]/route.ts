import { prisma } from "@/lib/prisma";
import { ImpressaoSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses } from "@/utils/helpers";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextRequest } from "next/server";
import z from "zod";

export const OpenAPIImpressaoId: RouteConfig = {
    tags: ['Impressao'],
    summary: 'Busca os dados da impressão',
    method: 'get',
    path: '/impressao/{id}',
    security: [{ BearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: generateOpenAPIErrorsResponses(ImpressaoSchema, {
        '400': ['Campo id é obrigatório'],
        '404': ['Impressão não encontrada']
    })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    const impressao = await prisma.impressao.findFirst({
        select: {
            impressora: {
                select: {
                    mac: true,
                    tipo: true
                }
            },
            checkin: {
                select: {
                    id: true,
                    turma: {
                        select: {
                            descricao: true
                        }
                    },
                    crianca: {
                        select: {
                            nome: true,
                            dataNascimento: true,
                            familia: {
                                include: {
                                    responsaveis: {
                                        take: 2,
                                        orderBy: [{ sexo: "asc" }],
                                        select: {
                                            nome: true,
                                            telefone: true,
                                            celula: true
                                        },
                                        where: {
                                            responsavelLegal: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            id
        }
    })

    if (!impressao) {
        return Response.json({ error: "Impressão não encontrada" }, { status: 404 })
    }

    return Response.json(impressao)
}