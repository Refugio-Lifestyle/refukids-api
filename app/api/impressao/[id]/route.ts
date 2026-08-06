import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

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

    return Response.json({ data: impressao })
}