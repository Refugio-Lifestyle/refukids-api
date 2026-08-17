import { OpenAPICheckinIdAcolhimento } from '@/app/api/checkins/[id]/acolhimento/route';
import { OpenAPICheckinIdAnotacao } from '@/app/api/checkins/[id]/anotacao/route';
import { version } from '@/package.json';
// @ts-ignore
import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { NextResponse } from "next/server";

export async function GET() {
    const openAPIRegistry = new OpenAPIRegistry()

    openAPIRegistry.registerPath(OpenAPICheckinIdAcolhimento)
    openAPIRegistry.registerPath(OpenAPICheckinIdAnotacao)

    const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions)
    const openApiDocument = generator.generateDocument({
        openapi: '3.0.0',
        info: { title: `Refukids API`, version },
    })

    return NextResponse.json(openApiDocument)
}