import { useUserToken } from "@/hooks/useUserToken";
import { firebaseDb } from "@/lib/firebase";
import { prisma } from "@/lib/prisma";
import { CheckinSchema } from "@/prisma/generated/zod";
import { generateOpenAPIErrorsResponses, getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { idZodValidacao } from "@/utils/validacoes";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { child, push, ref } from "firebase/database";
import moment from "moment";
import { NextRequest } from "next/server";
import z from "zod";

const RequestPostPayload = z
    .object({
        criancaId: idZodValidacao,
        impressoraId: idZodValidacao
    })

export const OpenAPICheckins: RouteConfig = {
    tags: ['Checkins'],
    summary: 'Registra um novo checkin',
    method: 'post',
    path: '/checkins',
    security: [{ BearerAuth: [] }],
    request: {
        body: {
            required: true,
            content: {
                'application/json': {
                    schema: RequestPostPayload
                }
            },
        }
    },
    responses: generateOpenAPIErrorsResponses(CheckinSchema, {
        '400': ['Campos obrigatórios', 'Checkin Já realizado para essa criança'],
        '401': ['Usuário sem permissão de fazer checkin'],
        '404': ['Impressora não encontrada ou sem operador', 'Criança não encontrada', 'Turma não encontrada para a idade da criança'],
        '500': ['Falha ao fazer o checkin']
    })
}

export async function POST(req: NextRequest) {
    const usuario = useUserToken(req)

    const { data: payload, error: payloadError } = z
        .object({
            criancaId: idZodValidacao,
            impressoraId: idZodValidacao
        })
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    let responsavel = await prisma.responsavel.findFirst({
        where: {
            cpf: usuario.cpf
        }
    })

    if (!responsavel) {
        return Response.json({ error: 'Usuário sem permissão de fazer checkin' }, { status: 401 })
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

    let crianca = await prisma.crianca.findFirst({
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
        },
        where: {
            id: payload.criancaId
        }
    })

    if (!crianca) {
        return Response.json({ error: 'Criança não encontrada' }, { status: 404 })
    }

    let dataNascimento = moment(crianca?.dataNascimento, "YYYY-MM-DD")
    let idade = moment().diff(dataNascimento, "years")

    let turma = await prisma.turma.findFirst({
        select: {
            id: true,
            descricao: true
        },
        where: {
            AND: [
                { idadeMinima: { lte: idade } },
                { idadeMaxima: { gte: idade } }
            ]
        }
    })

    if (!turma) {
        return Response.json({ error: 'Turma não encontrada para a idade da criança' }, { status: 404 })
    }

    try {
        let checkin = await prisma.checkin.create({
            select: {
                id: true,
                cadastradoEm: true
            },
            data: {
                culto: moment().format('YYYY-MM-DD'),
                criancaId: crianca.id,
                turmaId: turma.id,
                eventos: {
                    create: {
                        tipo: 'Checkin',
                        checkinPorId: responsavel.id,
                        responsaveisNotificados: true
                    }
                },
                impressoes: {
                    create: {
                        impressoraId: impressora.id
                    },
                }
            }
        })

        // Gera impressão do ticket
        let impressoesRef = ref(firebaseDb, `refukids/impressoes`)
        let impressoesOperadorRef = child(impressoesRef, impressora.operador!.cpf)
        await push(impressoesOperadorRef, {
            checkin: {
                ...checkin,
                cadastradoEm: checkin.cadastradoEm.getTime()
            },
            impressora,
            turma,
            crianca
        })

        // Notificar responsável
        let nomeResponsavel = responsavel.nome.split(' ')
        await notificarUsuario(
            usuario.cpf,
            [responsavel],
            { titulo: 'Checkin realizado', corpo: `Ola ${nomeResponsavel.shift()}, leve sua criança até a salinha ${turma.descricao}.` }
        )

        return Response.json(checkin)
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            let message = error.code === 'P2002'
                ? "Checkin Já realizado para essa criança"
                : getPrismaErrorMessage(error.code)

            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao fazer o checkin' }, { status: 500 })
    }
}