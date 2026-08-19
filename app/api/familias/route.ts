import { useUserInfo } from "@/hooks/useUserInfo"
import { useUserToken } from "@/hooks/useUserToken"
import { prisma } from "@/lib/prisma"
import { FamiliaSchema } from "@/prisma/generated/zod"
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers"
import { parentescoZodValidacao } from "@/utils/validacoes"
import { RouteConfig } from "@asteasolutions/zod-to-openapi"
import { Parentesco, Sexo } from "@prisma/client"
import { NextRequest } from "next/server"
import z from "zod"

export const OpenAPIFamiliasGet: RouteConfig = {
    tags: ['Familias'],
    summary: 'Busca a família do usuário',
    method: 'get',
    path: '/familias',
    security: [{ BearerAuth: [] }],
    responses: {
        ...generateOpenAPIErrorsResponses(FamiliaSchema, {}),
        204: {
            description: 'Usuário sem família cadastrada'
        }
    }
}

export async function GET(req: NextRequest) {
    const usuario = useUserToken(req)

    let familia = await prisma.familia.findFirst({
        include: {
            criancas: {
                include: {
                    checkins: {
                        select: {
                            id: true,
                            cadastradoEm: true
                        },
                        take: 5,
                        orderBy: {
                            cadastradoEm: 'desc'
                        }
                    }
                },
                orderBy: {
                    cadastradoEm: 'desc'
                }
            },
            responsaveis: {
                include: {
                    notificacoesRecebidas: {
                        select: {
                            id: true,
                            notificacao: {
                                include: {
                                    notificadoPor: {
                                        select: {
                                            nome: true,
                                            foto: true
                                        }
                                    }
                                }
                            }
                        },
                        where: {
                            lida: false,
                            notificadoParaResponsavel: {
                                cpf: usuario.cpf
                            }
                        },
                        orderBy: {
                            cadastradoEm: 'desc'
                        }
                    }
                },
                orderBy: {
                    cadastradoEm: 'desc'
                }
            }
        },
        where: {
            responsaveis: {
                some: {
                    cpf: usuario.cpf,
                    responsavelLegal: true
                }
            }
        }
    })

    if (!familia) {
        return new Response(null, { status: 204 })
    }

    return Response.json(familia)
}

const RequestPostSchema = z
    .object({
        nome: z.string({ error: "O campo Nome é obrigatório" }).trim(),
        parentesco: parentescoZodValidacao
    })

export const OpenAPIFamiliasPost: RouteConfig = {
    tags: ['Familias'],
    summary: 'Cadastra a família do usuário',
    method: 'post',
    path: '/familias',
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
    responses: generateOpenAPIErrorsResponses(FamiliaSchema, {
        '400': ['Campos obrigatórios', 'Usuário já possui uma Família'],
        '500': ['Falha ao cadastrar a família']
    })
}


export async function POST(req: NextRequest) {
    const usuario = await useUserInfo(req)

    const { data, error } = RequestPostSchema
        .safeParse(await req.json())

    if (error) {
        return Response.json({ error: error.message }, { status: 400 })
    }

    let responsavel = await prisma.responsavel.count({
        where: {
            cpf: usuario.cpf,
            responsavelLegal: true
        }
    })

    if (responsavel) {
        return Response.json({ error: 'Usuário já possui uma Família' }, { status: 400 })
    }

    try {
        const familia = await prisma.familia.create({
            data: {
                nome: data.nome,
                responsaveis: {
                    create: {
                        foto: usuario.profilePicture,
                        nome: usuario.name,
                        cpf: usuario.cpf,
                        sexo: usuario.gender as Sexo,
                        dataNascimento: usuario.birthdate,
                        telefone: usuario.phoneNumber,
                        endereco: usuario.full_address,
                        celula: usuario.celula,
                        responsavelLegal: true,
                        parentesco: data.parentesco as Parentesco,

                    }
                }
            },
            include: {
                criancas: true,
                responsaveis: true
            }
        })

        return Response.json(familia)
    } catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao cadastrar a família' }, { status: 400 })
    }
}