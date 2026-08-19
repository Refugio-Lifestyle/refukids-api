import { prisma } from "@/lib/prisma";
import { CheckinSchema, TurmasSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses } from "@/utils/helpers";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Turmas } from "@prisma/client";
import moment from "moment";
import { NextRequest } from "next/server";
import z from "zod";

export const OpenAPITurmasIdCheckins: RouteConfig = {
    tags: ['Turmas'],
    summary: 'Retorna os checkins realizado para a Turma para o culto informado',
    method: 'get',
    path: '/turmas/{id}/checkins',
    security: [{ BearerAuth: [] }],
    request: {
        query: z.object({
            culto: z.string().optional()
        }),
        params: z.object({
            id: TurmasSchema
        }),
    },
    responses: generateOpenAPIErrorsResponses(z.array(CheckinSchema), {
        '400': ['Campo Id é obrigatório']
    })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo id é obrigatório' }, { status: 400 })
    }

    let culto = req.nextUrl.searchParams.get('culto')
    if (!culto) {
        culto = moment().format('YYYY-MM-DD')
    }

    let checkins = await prisma.checkin.findMany({
        select: {
            id: true,
            cadastradoEm: true,
            crianca: {
                select: {
                    id: true,
                    foto: true,
                    nome: true,
                    sexo: true,
                    dataNascimento: true,
                    alergia: true,
                    condicaoMedicaMedicamento: true,
                    necessidadeEspecial: true,
                    observacao: true,
                    familia: {
                        select: {
                            responsaveis: {
                                select: {
                                    id: true,
                                    nome: true,
                                    foto: true,
                                    parentesco: true
                                },
                                where: {
                                    responsavelLegal: true
                                },
                                orderBy: {
                                    nome: "asc"
                                }
                            }
                        }
                    }
                }
            },
            eventos: {
                select: {
                    id: true,
                    tipo: true,
                    anotacao: true,
                    cadastradoEm: true,
                    checkinPor: {
                        select: {
                            id: true,
                            foto: true,
                            nome: true
                        }
                    },
                    acolhidoPor: {
                        select: {
                            id: true,
                            foto: true,
                            nome: true
                        }
                    },
                    checkoutPor: {
                        select: {
                            id: true,
                            foto: true,
                            nome: true
                        }
                    },
                    checkoutPara: {
                        select: {
                            id: true,
                            foto: true,
                            nome: true
                        }
                    },
                    anotadoPor: {
                        select: {
                            id: true,
                            foto: true,
                            nome: true
                        }
                    }
                },
                orderBy: {
                    cadastradoEm: 'asc'
                }
            }
        },
        orderBy: {
            crianca: {
                nome: "asc"
            }
        },
        where: {
            culto,
            turmaId: id as Turmas
        }
    })

    return Response.json(checkins)
}