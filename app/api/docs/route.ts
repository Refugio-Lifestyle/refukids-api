import { version } from '@/package.json';
import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { NextResponse } from "next/server";
import { OpenAPICheckinsIdAcolhimento } from '../checkins/[id]/acolhimento/route';
import { OpenAPICheckinsIdAnotacao } from '../checkins/[id]/anotacao/route';
import { OpenAPICheckinsIdCheckout } from '../checkins/[id]/checkout/route';
import { OpenAPICheckinsIdImpressoes } from '../checkins/[id]/impressao/route';
import { OpenAPICheckinsId } from '../checkins/[id]/route';
import { OpenAPICheckins } from '../checkins/route';
import { OpenAPIFamiliasGet, OpenAPIFamiliasPost } from '../familias/route';
import { OpenAPIHealth } from '../health/route';
import { OpenAPIImpressaoId } from '../impressao/[id]/route';
import { OpenAPIImpressorasIdDelete, OpenAPIImpressorasIdPatch, OpenAPIImpressorasIdPut } from '../impressoras/[id]/route';
import { OpenAPIImpressorasGet, OpenAPIImpressorasPost } from '../impressoras/route';
import { OpenAPINotificacaoGet, OpenAPINotificacaoPut } from '../notificacao/route';
import { OpenAPINotificacoesGet, OpenAPINotificacoesPost, OpenAPINotificacoesPut } from '../notificacoes/route';
import { OpenAPINotificarFamilia } from '../notificar/familia/route';
import { OpenAPINotificarTodosResponsaveis } from '../notificar/responsaveis/route';
import { OpenAPINotificarTodosServos } from '../notificar/servos/route';
import { OpenAPINotificarTodos } from '../notificar/todos/route';
import { OpenAPINotificarUsuario } from '../notificar/usuario/route';
import { OpenAPIResponsaveisIdDelete, OpenAPIResponsaveisIdGet, OpenAPIResponsaveisIdPut } from '../responsaveis/[id]/route';
import { OpenAPIResponsaveis } from '../responsaveis/route';
import { OpenAPITurmasIdCheckins } from '../turmas/[id]/checkins/route';
import { OpenAPIVersion } from '../version/route';

export const dynamic = 'force-static'

export async function GET() {
    const openAPIRegistry = new OpenAPIRegistry()

    openAPIRegistry.registerPath(OpenAPIHealth)
    openAPIRegistry.registerPath(OpenAPIFamiliasGet)
    openAPIRegistry.registerPath(OpenAPIFamiliasPost)
    openAPIRegistry.registerPath(OpenAPICheckinsIdAcolhimento)
    openAPIRegistry.registerPath(OpenAPICheckinsIdAnotacao)
    openAPIRegistry.registerPath(OpenAPICheckinsIdCheckout)
    openAPIRegistry.registerPath(OpenAPICheckinsIdImpressoes)
    openAPIRegistry.registerPath(OpenAPICheckinsId)
    openAPIRegistry.registerPath(OpenAPICheckins)
    openAPIRegistry.registerPath(OpenAPITurmasIdCheckins)
    openAPIRegistry.registerPath(OpenAPIVersion)
    openAPIRegistry.registerPath(OpenAPIResponsaveis)
    openAPIRegistry.registerPath(OpenAPIResponsaveisIdGet)
    openAPIRegistry.registerPath(OpenAPIResponsaveisIdPut)
    openAPIRegistry.registerPath(OpenAPIResponsaveisIdDelete)
    openAPIRegistry.registerPath(OpenAPINotificacoesGet)
    openAPIRegistry.registerPath(OpenAPINotificacoesPost)
    openAPIRegistry.registerPath(OpenAPINotificacoesPut)
    openAPIRegistry.registerPath(OpenAPINotificacaoGet)
    openAPIRegistry.registerPath(OpenAPINotificacaoPut)
    openAPIRegistry.registerPath(OpenAPINotificarFamilia)
    openAPIRegistry.registerPath(OpenAPINotificarTodos)
    openAPIRegistry.registerPath(OpenAPINotificarTodosResponsaveis)
    openAPIRegistry.registerPath(OpenAPINotificarTodosServos)
    openAPIRegistry.registerPath(OpenAPINotificarUsuario)
    openAPIRegistry.registerPath(OpenAPIImpressorasGet)
    openAPIRegistry.registerPath(OpenAPIImpressorasPost)
    openAPIRegistry.registerPath(OpenAPIImpressorasIdPut)
    openAPIRegistry.registerPath(OpenAPIImpressorasIdPatch)
    openAPIRegistry.registerPath(OpenAPIImpressorasIdDelete)
    openAPIRegistry.registerPath(OpenAPIImpressaoId)

    openAPIRegistry.registerComponent('securitySchemes', 'BearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT'
    });

    const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions)
    const openApiDocument = generator.generateDocument({
        openapi: '3.0.0',
        info: { title: `Refukids API`, version },
        servers: [
            { url: 'http://localhost:3000/api' },
            { url: 'https://refukids.arefugio.com.br/api' },
        ]
    })

    return NextResponse.json(openApiDocument)
}