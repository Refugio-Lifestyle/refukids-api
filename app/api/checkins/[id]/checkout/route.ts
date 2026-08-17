import { useUserToken } from "@/hooks/useUserToken";
import { prisma } from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/utils/helpers";
import { notificarUsuario } from "@/utils/notificacao";
import { idZodValidacao } from "@/utils/validacoes";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const usuario = useUserToken(req)

    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Campo Id é obrigatório' }, { status: 400 })
    }

    const { data: payload, error: payloadError } = z
        .object({
            checkoutParaId: idZodValidacao
        })
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError.message })
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
                tipo: "Checkout",
                checkinId: id,
                checkoutPorId: usuario.cpf,
                checkoutParaId: payload.checkoutParaId
            }
        })

        let nomeCrianca = checkin.crianca.nome.split(' ')
        await notificarUsuario(
            usuario.cpf,
            checkin.eventos.map(e => e.checkinPor!),
            { titulo: 'Checkout realizado', corpo: `Tchau tchau ${nomeCrianca.shift()}, até semana que vem! que Deus abençoe.` }
        )

        return Response.json({ data: evento })
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao registrar o checkout' }, { status: 500 })
    }
}