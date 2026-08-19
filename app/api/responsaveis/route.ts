import { useUserToken } from "@/hooks/useUserToken"
import { prisma } from "@/lib/prisma"
import { ResponsavelSchema } from "@/prisma/generated/zod"
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers"
import { celulaZodValidacao, cpfZodValidacao, dataNascimentoZodValidacao, enderecoZodValidacao, fotoZodValidacao, nomeZodValidacao, parentescoZodValidacao, sexoZodValidacao, telefoneZodValidacao } from "@/utils/validacoes"
import { RouteConfig } from "@asteasolutions/zod-to-openapi"
import { NextRequest } from "next/server"
import z from "zod"

const RequestPostSchema = z
    .object({
        cpf: cpfZodValidacao,
        nome: nomeZodValidacao,
        foto: fotoZodValidacao,
        sexo: sexoZodValidacao,
        telefone: telefoneZodValidacao,
        dataNascimento: dataNascimentoZodValidacao,
        parentesco: parentescoZodValidacao,
        endereco: enderecoZodValidacao,
        celula: celulaZodValidacao,
        responsavelLegal: z.boolean().default(true),
    })

export const OpenAPIResponsaveis: RouteConfig = {
    tags: ['Responsaveis/Tio'],
    summary: 'Cadastra um novo responsável/tio',
    method: 'post',
    path: '/responsaveis',
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
    responses: generateOpenAPIErrorsResponses(ResponsavelSchema, {
        '400': ['Campos obrigatórios'],
        '404': ['Família não encontrada para o Usuário'],
        '500': ['Falha ao cadastrar o responsável']
    })
}

export async function POST(req: NextRequest) {
    const usuario = useUserToken(req)

    const { data: payload, error: payloadError } = RequestPostSchema
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    let responsavelUsuario = await prisma.responsavel.findFirst({
        where: {
            cpf: usuario.cpf,
            responsavelLegal: true
        },
        select: { familiaId: true }
    })

    if (!responsavelUsuario) {
        return Response.json({ error: 'Família não encontrada para o Usuário' }, { status: 404 })
    }

    try {
        let responsavel = await prisma.responsavel.create({
            data: {
                cpf: payload.cpf,
                nome: payload.nome,
                foto: payload.foto,
                sexo: payload.sexo,
                telefone: payload.telefone,
                parentesco: payload.parentesco,
                dataNascimento: payload.dataNascimento,
                endereco: payload.endereco,
                celula: payload.celula,
                responsavelLegal: payload.responsavelLegal,
                familia: {
                    connect: {
                        id: responsavelUsuario?.familiaId
                    }
                }
            }
        })

        return Response.json(responsavel)
    } catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao cadastrar o responsável' }, { status: 500 })
    }
} 