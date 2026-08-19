import { appversion } from "@/package.json";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextResponse } from "next/server";
import z from "zod";

export const OpenAPIVersion: RouteConfig = {
    tags: ['Version'],
    summary: 'Retorna a versão do aplicativo para realizar a checagem na abertura do app',
    method: 'get',
    path: '/version',
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.object({
                        version: z.string(),
                        changelog: z.array(z.string()),
                        url: z.object({ android: z.string(), ios: z.string() })
                    })
                }
            }
        }
    }
}

export async function GET() {
    return NextResponse.json({
        version: appversion,
        changelog: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Suspendisse a gravida diam. Aenean euismod ante sed facilisis efficitur. Nam pulvinar augue a dictum lacinia.',
        ],
        url: {
            android: "https://play.google.com/store/apps/details?id=br.com.arefugio.refukids",
            ios: "https://apps.apple.com/app/br.com.arefugio.refukids"
        }
    })
}