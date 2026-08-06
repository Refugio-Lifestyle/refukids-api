import { prisma } from "@/lib/prisma"
import { getPrismaErrorMessage } from "@/utils/helpers"
import { fotoZodValidacao, idZodValidacao, impressoraTipoZodValidacao, nomeZodValidacao } from "@/utils/validacoes"
import { NextRequest } from "next/server"
import z from "zod"

export async function GET(req: NextRequest) {
    let impressoras = await prisma.impressora.findMany()
    return Response.json({ data: impressoras })
}

export async function POST(req: NextRequest) {
    const { data: payload, error: payloadError } = z
        .object({
            mac: idZodValidacao,
            modelo: idZodValidacao,
            tipo: impressoraTipoZodValidacao,
            foto: fotoZodValidacao,
            descricao: nomeZodValidacao,
        })
        .safeParse(await req.json())

    if (payloadError) {
        return Response.json({ error: payloadError?.message }, { status: 400 })
    }

    try {
        let impressora = await prisma.impressora.create({
            data: {
                mac: payload.mac,
                modelo: payload.modelo,
                tipo: payload.tipo,
                foto: payload.foto,
                descricao: payload.descricao
            }
        })

        return Response.json({ data: impressora })
    }
    catch (error: any) {
        console.error(error)

        if ("clientVersion" in error) {
            const message = getPrismaErrorMessage(error.code)
            return Response.json({ error: message }, { status: 400 })
        }

        return Response.json({ error: 'Falha ao cadastrar a impressora' }, { status: 500 })
    }
} 