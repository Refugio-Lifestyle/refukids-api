import { generateOpenAPIErrorsResponses } from "@/utils/helpers";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { NextResponse } from "next/server";
import z from "zod";

export const OpenAPIHealth: RouteConfig = {
    tags: ['Health'],
    summary: 'Health da API',
    method: 'get',
    path: '/health',
    responses: generateOpenAPIErrorsResponses(z.object({
        status: z.string().default('ok'),
        uptime: z.number()
    }), {})
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        uptime: process.uptime()
    })
}