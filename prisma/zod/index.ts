import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TurmaScalarFieldEnumSchema = z.enum(['id','descricao','idadeMinima','idadeMaxima','cadastradoEm','atualizadoEm','deletadoEm']);

export const FamiliaScalarFieldEnumSchema = z.enum(['id','nome','cadastradoEm','atualizadoEm','deletadoEm']);

export const CriancaScalarFieldEnumSchema = z.enum(['id','foto','nome','dataNascimento','sexo','observacao','celula','alergia','condicaoMedicaMedicamento','necessidadeEspecial','cadastradoEm','atualizadoEm','deletadoEm','familiaId']);

export const ResponsavelScalarFieldEnumSchema = z.enum(['id','foto','nome','cpf','sexo','dataNascimento','telefone','endereco','parentesco','celula','responsavelLegal','cadastradoEm','atualizadoEm','deletadoEm','familiaId','notificacoesToken']);

export const ImpressoraScalarFieldEnumSchema = z.enum(['id','mac','modelo','tipo','descricao','foto','cadastradoEm','atualizadoEm','deletadoEm','operadorId','ultimaConexaoEm']);

export const ImpressaoScalarFieldEnumSchema = z.enum(['id','cadastradoEm','atualizadoEm','deletadoEm','impressoraId','checkinId']);

export const CheckinScalarFieldEnumSchema = z.enum(['id','culto','criancaId','turmaId','cadastradoEm','atualizadoEm','deletadoEm']);

export const CheckinEventoScalarFieldEnumSchema = z.enum(['id','tipo','cadastradoEm','atualizadoEm','deletadoEm','checkinId','checkinPorId','acolhidoPorId','checkoutPorId','checkoutParaId','anotacao','anotadoPorId','responsaveisNotificados']);

export const ServoScalarFieldEnumSchema = z.enum(['id','cadastradoEm','atualizadoEm','deletadoEm','foto','nome','cpf','sexo','dataNascimento','telefone','endereco','celula','notificacoesToken']);

export const NotificacaoScalarFieldEnumSchema = z.enum(['id','titulo','descricao','cadastradoEm','atualizadoEm','deletadoEm','notificadoPorId']);

export const UsuarioNotificacaoScalarFieldEnumSchema = z.enum(['id','lida','cadastradoEm','atualizadoEm','deletadoEm','notificadoParaServoId','notificadoParaResponsavelId','notificacaoId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SexoSchema = z.enum(['Masculino','Feminino']);

export type SexoType = `${z.infer<typeof SexoSchema>}`

export const ParentescoSchema = z.enum(['Pai','Mae','Tio','Tia','Irmao','Irma','AvoM','AvoF','Lider','Outro']);

export type ParentescoType = `${z.infer<typeof ParentescoSchema>}`

export const TurmasSchema = z.enum(['Refubabies','Refukids1','Refukids2','Refuteens']);

export type TurmasType = `${z.infer<typeof TurmasSchema>}`

export const CheckinEventosSchema = z.enum(['Checkin','Acolhimento','Checkout','Anotacao']);

export type CheckinEventosType = `${z.infer<typeof CheckinEventosSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TURMA SCHEMA
/////////////////////////////////////////

export const TurmaSchema = z.object({
  id: TurmasSchema,
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
})

export type Turma = z.infer<typeof TurmaSchema>

/////////////////////////////////////////
// FAMILIA SCHEMA
/////////////////////////////////////////

export const FamiliaSchema = z.object({
  id: z.uuid(),
  nome: z.string(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
})

export type Familia = z.infer<typeof FamiliaSchema>

/////////////////////////////////////////
// CRIANCA SCHEMA
/////////////////////////////////////////

export const CriancaSchema = z.object({
  sexo: SexoSchema,
  id: z.uuid(),
  foto: z.string().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  observacao: z.string().nullable(),
  celula: z.string().nullable(),
  alergia: z.string().nullable(),
  condicaoMedicaMedicamento: z.string().nullable(),
  necessidadeEspecial: z.string().nullable(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  familiaId: z.string(),
})

export type Crianca = z.infer<typeof CriancaSchema>

/////////////////////////////////////////
// RESPONSAVEL SCHEMA
/////////////////////////////////////////

export const ResponsavelSchema = z.object({
  sexo: SexoSchema,
  parentesco: ParentescoSchema,
  id: z.uuid(),
  foto: z.string().nullable(),
  nome: z.string(),
  cpf: z.string(),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().nullable(),
})

export type Responsavel = z.infer<typeof ResponsavelSchema>

/////////////////////////////////////////
// IMPRESSORA SCHEMA
/////////////////////////////////////////

export const ImpressoraSchema = z.object({
  id: z.uuid(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().nullable(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  operadorId: z.string().nullable(),
  ultimaConexaoEm: z.coerce.date().nullable(),
})

export type Impressora = z.infer<typeof ImpressoraSchema>

/////////////////////////////////////////
// IMPRESSAO SCHEMA
/////////////////////////////////////////

export const ImpressaoSchema = z.object({
  id: z.uuid(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  impressoraId: z.string(),
  checkinId: z.string(),
})

export type Impressao = z.infer<typeof ImpressaoSchema>

/////////////////////////////////////////
// CHECKIN SCHEMA
/////////////////////////////////////////

export const CheckinSchema = z.object({
  turmaId: TurmasSchema,
  id: z.uuid(),
  culto: z.string(),
  criancaId: z.string(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
})

export type Checkin = z.infer<typeof CheckinSchema>

/////////////////////////////////////////
// CHECKIN EVENTO SCHEMA
/////////////////////////////////////////

export const CheckinEventoSchema = z.object({
  tipo: CheckinEventosSchema,
  id: z.uuid(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().nullable(),
  acolhidoPorId: z.string().nullable(),
  checkoutPorId: z.string().nullable(),
  checkoutParaId: z.string().nullable(),
  anotacao: z.string().nullable(),
  anotadoPorId: z.string().nullable(),
  responsaveisNotificados: z.boolean().nullable(),
})

export type CheckinEvento = z.infer<typeof CheckinEventoSchema>

/////////////////////////////////////////
// SERVO SCHEMA
/////////////////////////////////////////

export const ServoSchema = z.object({
  sexo: SexoSchema,
  id: z.uuid(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  foto: z.string().nullable(),
  nome: z.string(),
  cpf: z.string(),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().nullable(),
  notificacoesToken: z.string().nullable(),
})

export type Servo = z.infer<typeof ServoSchema>

/////////////////////////////////////////
// NOTIFICACAO SCHEMA
/////////////////////////////////////////

export const NotificacaoSchema = z.object({
  id: z.uuid(),
  titulo: z.string().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  notificadoPorId: z.string(),
})

export type Notificacao = z.infer<typeof NotificacaoSchema>

/////////////////////////////////////////
// USUARIO NOTIFICACAO SCHEMA
/////////////////////////////////////////

export const UsuarioNotificacaoSchema = z.object({
  id: z.uuid(),
  lida: z.boolean(),
  cadastradoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date(),
  deletadoEm: z.coerce.date().nullable(),
  notificadoParaServoId: z.string().nullable(),
  notificadoParaResponsavelId: z.string().nullable(),
  notificacaoId: z.string(),
})

export type UsuarioNotificacao = z.infer<typeof UsuarioNotificacaoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TURMA
//------------------------------------------------------

export const TurmaIncludeSchema: z.ZodType<Prisma.TurmaInclude> = z.object({
  checkins: z.union([z.boolean(),z.lazy(() => CheckinFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TurmaCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const TurmaArgsSchema: z.ZodType<Prisma.TurmaDefaultArgs> = z.object({
  select: z.lazy(() => TurmaSelectSchema).optional(),
  include: z.lazy(() => TurmaIncludeSchema).optional(),
}).strict();

export const TurmaCountOutputTypeArgsSchema: z.ZodType<Prisma.TurmaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TurmaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TurmaCountOutputTypeSelectSchema: z.ZodType<Prisma.TurmaCountOutputTypeSelect> = z.object({
  checkins: z.boolean().optional(),
}).strict();

export const TurmaSelectSchema: z.ZodType<Prisma.TurmaSelect> = z.object({
  id: z.boolean().optional(),
  descricao: z.boolean().optional(),
  idadeMinima: z.boolean().optional(),
  idadeMaxima: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  checkins: z.union([z.boolean(),z.lazy(() => CheckinFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TurmaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FAMILIA
//------------------------------------------------------

export const FamiliaIncludeSchema: z.ZodType<Prisma.FamiliaInclude> = z.object({
  criancas: z.union([z.boolean(),z.lazy(() => CriancaFindManyArgsSchema)]).optional(),
  responsaveis: z.union([z.boolean(),z.lazy(() => ResponsavelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FamiliaCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const FamiliaArgsSchema: z.ZodType<Prisma.FamiliaDefaultArgs> = z.object({
  select: z.lazy(() => FamiliaSelectSchema).optional(),
  include: z.lazy(() => FamiliaIncludeSchema).optional(),
}).strict();

export const FamiliaCountOutputTypeArgsSchema: z.ZodType<Prisma.FamiliaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FamiliaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FamiliaCountOutputTypeSelectSchema: z.ZodType<Prisma.FamiliaCountOutputTypeSelect> = z.object({
  criancas: z.boolean().optional(),
  responsaveis: z.boolean().optional(),
}).strict();

export const FamiliaSelectSchema: z.ZodType<Prisma.FamiliaSelect> = z.object({
  id: z.boolean().optional(),
  nome: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  criancas: z.union([z.boolean(),z.lazy(() => CriancaFindManyArgsSchema)]).optional(),
  responsaveis: z.union([z.boolean(),z.lazy(() => ResponsavelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FamiliaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CRIANCA
//------------------------------------------------------

export const CriancaIncludeSchema: z.ZodType<Prisma.CriancaInclude> = z.object({
  familia: z.union([z.boolean(),z.lazy(() => FamiliaArgsSchema)]).optional(),
  checkins: z.union([z.boolean(),z.lazy(() => CheckinFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CriancaCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CriancaArgsSchema: z.ZodType<Prisma.CriancaDefaultArgs> = z.object({
  select: z.lazy(() => CriancaSelectSchema).optional(),
  include: z.lazy(() => CriancaIncludeSchema).optional(),
}).strict();

export const CriancaCountOutputTypeArgsSchema: z.ZodType<Prisma.CriancaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CriancaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CriancaCountOutputTypeSelectSchema: z.ZodType<Prisma.CriancaCountOutputTypeSelect> = z.object({
  checkins: z.boolean().optional(),
}).strict();

export const CriancaSelectSchema: z.ZodType<Prisma.CriancaSelect> = z.object({
  id: z.boolean().optional(),
  foto: z.boolean().optional(),
  nome: z.boolean().optional(),
  dataNascimento: z.boolean().optional(),
  sexo: z.boolean().optional(),
  observacao: z.boolean().optional(),
  celula: z.boolean().optional(),
  alergia: z.boolean().optional(),
  condicaoMedicaMedicamento: z.boolean().optional(),
  necessidadeEspecial: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  familiaId: z.boolean().optional(),
  familia: z.union([z.boolean(),z.lazy(() => FamiliaArgsSchema)]).optional(),
  checkins: z.union([z.boolean(),z.lazy(() => CheckinFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CriancaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESPONSAVEL
//------------------------------------------------------

export const ResponsavelIncludeSchema: z.ZodType<Prisma.ResponsavelInclude> = z.object({
  familia: z.union([z.boolean(),z.lazy(() => FamiliaArgsSchema)]).optional(),
  notificacoesRecebidas: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  checkins: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  checkout: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ResponsavelCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ResponsavelArgsSchema: z.ZodType<Prisma.ResponsavelDefaultArgs> = z.object({
  select: z.lazy(() => ResponsavelSelectSchema).optional(),
  include: z.lazy(() => ResponsavelIncludeSchema).optional(),
}).strict();

export const ResponsavelCountOutputTypeArgsSchema: z.ZodType<Prisma.ResponsavelCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ResponsavelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ResponsavelCountOutputTypeSelectSchema: z.ZodType<Prisma.ResponsavelCountOutputTypeSelect> = z.object({
  notificacoesRecebidas: z.boolean().optional(),
  checkins: z.boolean().optional(),
  checkout: z.boolean().optional(),
}).strict();

export const ResponsavelSelectSchema: z.ZodType<Prisma.ResponsavelSelect> = z.object({
  id: z.boolean().optional(),
  foto: z.boolean().optional(),
  nome: z.boolean().optional(),
  cpf: z.boolean().optional(),
  sexo: z.boolean().optional(),
  dataNascimento: z.boolean().optional(),
  telefone: z.boolean().optional(),
  endereco: z.boolean().optional(),
  parentesco: z.boolean().optional(),
  celula: z.boolean().optional(),
  responsavelLegal: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  familiaId: z.boolean().optional(),
  notificacoesToken: z.boolean().optional(),
  familia: z.union([z.boolean(),z.lazy(() => FamiliaArgsSchema)]).optional(),
  notificacoesRecebidas: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  checkins: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  checkout: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ResponsavelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// IMPRESSORA
//------------------------------------------------------

export const ImpressoraIncludeSchema: z.ZodType<Prisma.ImpressoraInclude> = z.object({
  operador: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  impressoes: z.union([z.boolean(),z.lazy(() => ImpressaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ImpressoraCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ImpressoraArgsSchema: z.ZodType<Prisma.ImpressoraDefaultArgs> = z.object({
  select: z.lazy(() => ImpressoraSelectSchema).optional(),
  include: z.lazy(() => ImpressoraIncludeSchema).optional(),
}).strict();

export const ImpressoraCountOutputTypeArgsSchema: z.ZodType<Prisma.ImpressoraCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ImpressoraCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ImpressoraCountOutputTypeSelectSchema: z.ZodType<Prisma.ImpressoraCountOutputTypeSelect> = z.object({
  impressoes: z.boolean().optional(),
}).strict();

export const ImpressoraSelectSchema: z.ZodType<Prisma.ImpressoraSelect> = z.object({
  id: z.boolean().optional(),
  mac: z.boolean().optional(),
  modelo: z.boolean().optional(),
  tipo: z.boolean().optional(),
  descricao: z.boolean().optional(),
  foto: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  operadorId: z.boolean().optional(),
  ultimaConexaoEm: z.boolean().optional(),
  operador: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  impressoes: z.union([z.boolean(),z.lazy(() => ImpressaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ImpressoraCountOutputTypeArgsSchema)]).optional(),
}).strict()

// IMPRESSAO
//------------------------------------------------------

export const ImpressaoIncludeSchema: z.ZodType<Prisma.ImpressaoInclude> = z.object({
  impressora: z.union([z.boolean(),z.lazy(() => ImpressoraArgsSchema)]).optional(),
  checkin: z.union([z.boolean(),z.lazy(() => CheckinArgsSchema)]).optional(),
}).strict();

export const ImpressaoArgsSchema: z.ZodType<Prisma.ImpressaoDefaultArgs> = z.object({
  select: z.lazy(() => ImpressaoSelectSchema).optional(),
  include: z.lazy(() => ImpressaoIncludeSchema).optional(),
}).strict();

export const ImpressaoSelectSchema: z.ZodType<Prisma.ImpressaoSelect> = z.object({
  id: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  impressoraId: z.boolean().optional(),
  checkinId: z.boolean().optional(),
  impressora: z.union([z.boolean(),z.lazy(() => ImpressoraArgsSchema)]).optional(),
  checkin: z.union([z.boolean(),z.lazy(() => CheckinArgsSchema)]).optional(),
}).strict()

// CHECKIN
//------------------------------------------------------

export const CheckinIncludeSchema: z.ZodType<Prisma.CheckinInclude> = z.object({
  crianca: z.union([z.boolean(),z.lazy(() => CriancaArgsSchema)]).optional(),
  turma: z.union([z.boolean(),z.lazy(() => TurmaArgsSchema)]).optional(),
  eventos: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  impressoes: z.union([z.boolean(),z.lazy(() => ImpressaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CheckinCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CheckinArgsSchema: z.ZodType<Prisma.CheckinDefaultArgs> = z.object({
  select: z.lazy(() => CheckinSelectSchema).optional(),
  include: z.lazy(() => CheckinIncludeSchema).optional(),
}).strict();

export const CheckinCountOutputTypeArgsSchema: z.ZodType<Prisma.CheckinCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CheckinCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CheckinCountOutputTypeSelectSchema: z.ZodType<Prisma.CheckinCountOutputTypeSelect> = z.object({
  eventos: z.boolean().optional(),
  impressoes: z.boolean().optional(),
}).strict();

export const CheckinSelectSchema: z.ZodType<Prisma.CheckinSelect> = z.object({
  id: z.boolean().optional(),
  culto: z.boolean().optional(),
  criancaId: z.boolean().optional(),
  turmaId: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  crianca: z.union([z.boolean(),z.lazy(() => CriancaArgsSchema)]).optional(),
  turma: z.union([z.boolean(),z.lazy(() => TurmaArgsSchema)]).optional(),
  eventos: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  impressoes: z.union([z.boolean(),z.lazy(() => ImpressaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CheckinCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHECKIN EVENTO
//------------------------------------------------------

export const CheckinEventoIncludeSchema: z.ZodType<Prisma.CheckinEventoInclude> = z.object({
  checkin: z.union([z.boolean(),z.lazy(() => CheckinArgsSchema)]).optional(),
  checkinPor: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  acolhidoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  checkoutPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  checkoutPara: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  anotadoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
}).strict();

export const CheckinEventoArgsSchema: z.ZodType<Prisma.CheckinEventoDefaultArgs> = z.object({
  select: z.lazy(() => CheckinEventoSelectSchema).optional(),
  include: z.lazy(() => CheckinEventoIncludeSchema).optional(),
}).strict();

export const CheckinEventoSelectSchema: z.ZodType<Prisma.CheckinEventoSelect> = z.object({
  id: z.boolean().optional(),
  tipo: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  checkinId: z.boolean().optional(),
  checkinPorId: z.boolean().optional(),
  acolhidoPorId: z.boolean().optional(),
  checkoutPorId: z.boolean().optional(),
  checkoutParaId: z.boolean().optional(),
  anotacao: z.boolean().optional(),
  anotadoPorId: z.boolean().optional(),
  responsaveisNotificados: z.boolean().optional(),
  checkin: z.union([z.boolean(),z.lazy(() => CheckinArgsSchema)]).optional(),
  checkinPor: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  acolhidoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  checkoutPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  checkoutPara: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  anotadoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
}).strict()

// SERVO
//------------------------------------------------------

export const ServoIncludeSchema: z.ZodType<Prisma.ServoInclude> = z.object({
  notificacoesFeitas: z.union([z.boolean(),z.lazy(() => NotificacaoFindManyArgsSchema)]).optional(),
  notificacoesRecebidas: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  acolhimentos: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  checkouts: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  anotacoes: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  impressoras: z.union([z.boolean(),z.lazy(() => ImpressoraFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServoCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ServoArgsSchema: z.ZodType<Prisma.ServoDefaultArgs> = z.object({
  select: z.lazy(() => ServoSelectSchema).optional(),
  include: z.lazy(() => ServoIncludeSchema).optional(),
}).strict();

export const ServoCountOutputTypeArgsSchema: z.ZodType<Prisma.ServoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ServoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServoCountOutputTypeSelectSchema: z.ZodType<Prisma.ServoCountOutputTypeSelect> = z.object({
  notificacoesFeitas: z.boolean().optional(),
  notificacoesRecebidas: z.boolean().optional(),
  acolhimentos: z.boolean().optional(),
  checkouts: z.boolean().optional(),
  anotacoes: z.boolean().optional(),
  impressoras: z.boolean().optional(),
}).strict();

export const ServoSelectSchema: z.ZodType<Prisma.ServoSelect> = z.object({
  id: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  foto: z.boolean().optional(),
  nome: z.boolean().optional(),
  cpf: z.boolean().optional(),
  sexo: z.boolean().optional(),
  dataNascimento: z.boolean().optional(),
  telefone: z.boolean().optional(),
  endereco: z.boolean().optional(),
  celula: z.boolean().optional(),
  notificacoesToken: z.boolean().optional(),
  notificacoesFeitas: z.union([z.boolean(),z.lazy(() => NotificacaoFindManyArgsSchema)]).optional(),
  notificacoesRecebidas: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  acolhimentos: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  checkouts: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  anotacoes: z.union([z.boolean(),z.lazy(() => CheckinEventoFindManyArgsSchema)]).optional(),
  impressoras: z.union([z.boolean(),z.lazy(() => ImpressoraFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NOTIFICACAO
//------------------------------------------------------

export const NotificacaoIncludeSchema: z.ZodType<Prisma.NotificacaoInclude> = z.object({
  notificadoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  usuariosNotificados: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NotificacaoCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const NotificacaoArgsSchema: z.ZodType<Prisma.NotificacaoDefaultArgs> = z.object({
  select: z.lazy(() => NotificacaoSelectSchema).optional(),
  include: z.lazy(() => NotificacaoIncludeSchema).optional(),
}).strict();

export const NotificacaoCountOutputTypeArgsSchema: z.ZodType<Prisma.NotificacaoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NotificacaoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NotificacaoCountOutputTypeSelectSchema: z.ZodType<Prisma.NotificacaoCountOutputTypeSelect> = z.object({
  usuariosNotificados: z.boolean().optional(),
}).strict();

export const NotificacaoSelectSchema: z.ZodType<Prisma.NotificacaoSelect> = z.object({
  id: z.boolean().optional(),
  titulo: z.boolean().optional(),
  descricao: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  notificadoPorId: z.boolean().optional(),
  notificadoPor: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  usuariosNotificados: z.union([z.boolean(),z.lazy(() => UsuarioNotificacaoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NotificacaoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USUARIO NOTIFICACAO
//------------------------------------------------------

export const UsuarioNotificacaoIncludeSchema: z.ZodType<Prisma.UsuarioNotificacaoInclude> = z.object({
  notificadoParaServo: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  notificadoParaResponsavel: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  notificacao: z.union([z.boolean(),z.lazy(() => NotificacaoArgsSchema)]).optional(),
}).strict();

export const UsuarioNotificacaoArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoDefaultArgs> = z.object({
  select: z.lazy(() => UsuarioNotificacaoSelectSchema).optional(),
  include: z.lazy(() => UsuarioNotificacaoIncludeSchema).optional(),
}).strict();

export const UsuarioNotificacaoSelectSchema: z.ZodType<Prisma.UsuarioNotificacaoSelect> = z.object({
  id: z.boolean().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.boolean().optional(),
  atualizadoEm: z.boolean().optional(),
  deletadoEm: z.boolean().optional(),
  notificadoParaServoId: z.boolean().optional(),
  notificadoParaResponsavelId: z.boolean().optional(),
  notificacaoId: z.boolean().optional(),
  notificadoParaServo: z.union([z.boolean(),z.lazy(() => ServoArgsSchema)]).optional(),
  notificadoParaResponsavel: z.union([z.boolean(),z.lazy(() => ResponsavelArgsSchema)]).optional(),
  notificacao: z.union([z.boolean(),z.lazy(() => NotificacaoArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TurmaWhereInputSchema: z.ZodType<Prisma.TurmaWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TurmaWhereInputSchema), z.lazy(() => TurmaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TurmaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TurmaWhereInputSchema), z.lazy(() => TurmaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumTurmasFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idadeMinima: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  idadeMaxima: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkins: z.lazy(() => CheckinListRelationFilterSchema).optional(),
});

export const TurmaOrderByWithRelationInputSchema: z.ZodType<Prisma.TurmaOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkins: z.lazy(() => CheckinOrderByRelationAggregateInputSchema).optional(),
});

export const TurmaWhereUniqueInputSchema: z.ZodType<Prisma.TurmaWhereUniqueInput> = z.object({
  id: z.lazy(() => TurmasSchema),
})
.and(z.strictObject({
  id: z.lazy(() => TurmasSchema).optional(),
  AND: z.union([ z.lazy(() => TurmaWhereInputSchema), z.lazy(() => TurmaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TurmaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TurmaWhereInputSchema), z.lazy(() => TurmaWhereInputSchema).array() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idadeMinima: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  idadeMaxima: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkins: z.lazy(() => CheckinListRelationFilterSchema).optional(),
}));

export const TurmaOrderByWithAggregationInputSchema: z.ZodType<Prisma.TurmaOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TurmaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TurmaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TurmaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TurmaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TurmaSumOrderByAggregateInputSchema).optional(),
});

export const TurmaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TurmaScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TurmaScalarWhereWithAggregatesInputSchema), z.lazy(() => TurmaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TurmaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TurmaScalarWhereWithAggregatesInputSchema), z.lazy(() => TurmaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumTurmasWithAggregatesFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  descricao: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idadeMinima: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  idadeMaxima: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const FamiliaWhereInputSchema: z.ZodType<Prisma.FamiliaWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FamiliaWhereInputSchema), z.lazy(() => FamiliaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FamiliaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FamiliaWhereInputSchema), z.lazy(() => FamiliaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  criancas: z.lazy(() => CriancaListRelationFilterSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelListRelationFilterSchema).optional(),
});

export const FamiliaOrderByWithRelationInputSchema: z.ZodType<Prisma.FamiliaOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  criancas: z.lazy(() => CriancaOrderByRelationAggregateInputSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelOrderByRelationAggregateInputSchema).optional(),
});

export const FamiliaWhereUniqueInputSchema: z.ZodType<Prisma.FamiliaWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => FamiliaWhereInputSchema), z.lazy(() => FamiliaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FamiliaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FamiliaWhereInputSchema), z.lazy(() => FamiliaWhereInputSchema).array() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  criancas: z.lazy(() => CriancaListRelationFilterSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelListRelationFilterSchema).optional(),
}));

export const FamiliaOrderByWithAggregationInputSchema: z.ZodType<Prisma.FamiliaOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FamiliaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FamiliaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FamiliaMinOrderByAggregateInputSchema).optional(),
});

export const FamiliaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FamiliaScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FamiliaScalarWhereWithAggregatesInputSchema), z.lazy(() => FamiliaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FamiliaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FamiliaScalarWhereWithAggregatesInputSchema), z.lazy(() => FamiliaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const CriancaWhereInputSchema: z.ZodType<Prisma.CriancaWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CriancaWhereInputSchema), z.lazy(() => CriancaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CriancaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CriancaWhereInputSchema), z.lazy(() => CriancaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  observacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  alergia: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  familia: z.union([ z.lazy(() => FamiliaScalarRelationFilterSchema), z.lazy(() => FamiliaWhereInputSchema) ]).optional(),
  checkins: z.lazy(() => CheckinListRelationFilterSchema).optional(),
});

export const CriancaOrderByWithRelationInputSchema: z.ZodType<Prisma.CriancaOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  observacao: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  alergia: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  necessidadeEspecial: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  familia: z.lazy(() => FamiliaOrderByWithRelationInputSchema).optional(),
  checkins: z.lazy(() => CheckinOrderByRelationAggregateInputSchema).optional(),
});

export const CriancaWhereUniqueInputSchema: z.ZodType<Prisma.CriancaWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => CriancaWhereInputSchema), z.lazy(() => CriancaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CriancaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CriancaWhereInputSchema), z.lazy(() => CriancaWhereInputSchema).array() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  observacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  alergia: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  familia: z.union([ z.lazy(() => FamiliaScalarRelationFilterSchema), z.lazy(() => FamiliaWhereInputSchema) ]).optional(),
  checkins: z.lazy(() => CheckinListRelationFilterSchema).optional(),
}));

export const CriancaOrderByWithAggregationInputSchema: z.ZodType<Prisma.CriancaOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  observacao: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  alergia: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  necessidadeEspecial: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CriancaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CriancaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CriancaMinOrderByAggregateInputSchema).optional(),
});

export const CriancaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CriancaScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CriancaScalarWhereWithAggregatesInputSchema), z.lazy(() => CriancaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CriancaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CriancaScalarWhereWithAggregatesInputSchema), z.lazy(() => CriancaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoWithAggregatesFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  observacao: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  celula: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  alergia: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const ResponsavelWhereInputSchema: z.ZodType<Prisma.ResponsavelWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ResponsavelWhereInputSchema), z.lazy(() => ResponsavelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponsavelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponsavelWhereInputSchema), z.lazy(() => ResponsavelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  parentesco: z.union([ z.lazy(() => EnumParentescoFilterSchema), z.lazy(() => ParentescoSchema) ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsavelLegal: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  familia: z.union([ z.lazy(() => FamiliaScalarRelationFilterSchema), z.lazy(() => FamiliaWhereInputSchema) ]).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
  checkins: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  checkout: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
});

export const ResponsavelOrderByWithRelationInputSchema: z.ZodType<Prisma.ResponsavelOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  parentesco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsavelLegal: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  familia: z.lazy(() => FamiliaOrderByWithRelationInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoOrderByRelationAggregateInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
});

export const ResponsavelWhereUniqueInputSchema: z.ZodType<Prisma.ResponsavelWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    cpf_familiaId: z.lazy(() => ResponsavelCpfFamiliaIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    cpf_familiaId: z.lazy(() => ResponsavelCpfFamiliaIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  cpf_familiaId: z.lazy(() => ResponsavelCpfFamiliaIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ResponsavelWhereInputSchema), z.lazy(() => ResponsavelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponsavelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponsavelWhereInputSchema), z.lazy(() => ResponsavelWhereInputSchema).array() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  parentesco: z.union([ z.lazy(() => EnumParentescoFilterSchema), z.lazy(() => ParentescoSchema) ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsavelLegal: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  familia: z.union([ z.lazy(() => FamiliaScalarRelationFilterSchema), z.lazy(() => FamiliaWhereInputSchema) ]).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
  checkins: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  checkout: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
}));

export const ResponsavelOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResponsavelOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  parentesco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsavelLegal: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ResponsavelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResponsavelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResponsavelMinOrderByAggregateInputSchema).optional(),
});

export const ResponsavelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResponsavelScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ResponsavelScalarWhereWithAggregatesInputSchema), z.lazy(() => ResponsavelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponsavelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponsavelScalarWhereWithAggregatesInputSchema), z.lazy(() => ResponsavelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoWithAggregatesFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  parentesco: z.union([ z.lazy(() => EnumParentescoWithAggregatesFilterSchema), z.lazy(() => ParentescoSchema) ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  responsavelLegal: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const ImpressoraWhereInputSchema: z.ZodType<Prisma.ImpressoraWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressoraWhereInputSchema), z.lazy(() => ImpressoraWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressoraWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressoraWhereInputSchema), z.lazy(() => ImpressoraWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  mac: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modelo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operadorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operador: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoListRelationFilterSchema).optional(),
});

export const ImpressoraOrderByWithRelationInputSchema: z.ZodType<Prisma.ImpressoraOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  mac: z.lazy(() => SortOrderSchema).optional(),
  modelo: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  operadorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ultimaConexaoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  operador: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoOrderByRelationAggregateInputSchema).optional(),
});

export const ImpressoraWhereUniqueInputSchema: z.ZodType<Prisma.ImpressoraWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => ImpressoraWhereInputSchema), z.lazy(() => ImpressoraWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressoraWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressoraWhereInputSchema), z.lazy(() => ImpressoraWhereInputSchema).array() ]).optional(),
  mac: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modelo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operadorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operador: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoListRelationFilterSchema).optional(),
}));

export const ImpressoraOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImpressoraOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  mac: z.lazy(() => SortOrderSchema).optional(),
  modelo: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  operadorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ultimaConexaoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ImpressoraCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImpressoraMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImpressoraMinOrderByAggregateInputSchema).optional(),
});

export const ImpressoraScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImpressoraScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressoraScalarWhereWithAggregatesInputSchema), z.lazy(() => ImpressoraScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressoraScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressoraScalarWhereWithAggregatesInputSchema), z.lazy(() => ImpressoraScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  mac: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  modelo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  operadorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const ImpressaoWhereInputSchema: z.ZodType<Prisma.ImpressaoWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressaoWhereInputSchema), z.lazy(() => ImpressaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressaoWhereInputSchema), z.lazy(() => ImpressaoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  impressoraId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  impressora: z.union([ z.lazy(() => ImpressoraScalarRelationFilterSchema), z.lazy(() => ImpressoraWhereInputSchema) ]).optional(),
  checkin: z.union([ z.lazy(() => CheckinScalarRelationFilterSchema), z.lazy(() => CheckinWhereInputSchema) ]).optional(),
});

export const ImpressaoOrderByWithRelationInputSchema: z.ZodType<Prisma.ImpressaoOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  impressoraId: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  impressora: z.lazy(() => ImpressoraOrderByWithRelationInputSchema).optional(),
  checkin: z.lazy(() => CheckinOrderByWithRelationInputSchema).optional(),
});

export const ImpressaoWhereUniqueInputSchema: z.ZodType<Prisma.ImpressaoWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => ImpressaoWhereInputSchema), z.lazy(() => ImpressaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressaoWhereInputSchema), z.lazy(() => ImpressaoWhereInputSchema).array() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  impressoraId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  impressora: z.union([ z.lazy(() => ImpressoraScalarRelationFilterSchema), z.lazy(() => ImpressoraWhereInputSchema) ]).optional(),
  checkin: z.union([ z.lazy(() => CheckinScalarRelationFilterSchema), z.lazy(() => CheckinWhereInputSchema) ]).optional(),
}));

export const ImpressaoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImpressaoOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  impressoraId: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImpressaoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImpressaoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImpressaoMinOrderByAggregateInputSchema).optional(),
});

export const ImpressaoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImpressaoScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressaoScalarWhereWithAggregatesInputSchema), z.lazy(() => ImpressaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressaoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressaoScalarWhereWithAggregatesInputSchema), z.lazy(() => ImpressaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  impressoraId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  checkinId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CheckinWhereInputSchema: z.ZodType<Prisma.CheckinWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinWhereInputSchema), z.lazy(() => CheckinWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinWhereInputSchema), z.lazy(() => CheckinWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  culto: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  criancaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  turmaId: z.union([ z.lazy(() => EnumTurmasFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  crianca: z.union([ z.lazy(() => CriancaScalarRelationFilterSchema), z.lazy(() => CriancaWhereInputSchema) ]).optional(),
  turma: z.union([ z.lazy(() => TurmaScalarRelationFilterSchema), z.lazy(() => TurmaWhereInputSchema) ]).optional(),
  eventos: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  impressoes: z.lazy(() => ImpressaoListRelationFilterSchema).optional(),
});

export const CheckinOrderByWithRelationInputSchema: z.ZodType<Prisma.CheckinOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  culto: z.lazy(() => SortOrderSchema).optional(),
  criancaId: z.lazy(() => SortOrderSchema).optional(),
  turmaId: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  crianca: z.lazy(() => CriancaOrderByWithRelationInputSchema).optional(),
  turma: z.lazy(() => TurmaOrderByWithRelationInputSchema).optional(),
  eventos: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoOrderByRelationAggregateInputSchema).optional(),
});

export const CheckinWhereUniqueInputSchema: z.ZodType<Prisma.CheckinWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    culto_criancaId: z.lazy(() => CheckinCultoCriancaIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    culto_criancaId: z.lazy(() => CheckinCultoCriancaIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  culto_criancaId: z.lazy(() => CheckinCultoCriancaIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CheckinWhereInputSchema), z.lazy(() => CheckinWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinWhereInputSchema), z.lazy(() => CheckinWhereInputSchema).array() ]).optional(),
  culto: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  criancaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  turmaId: z.union([ z.lazy(() => EnumTurmasFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  crianca: z.union([ z.lazy(() => CriancaScalarRelationFilterSchema), z.lazy(() => CriancaWhereInputSchema) ]).optional(),
  turma: z.union([ z.lazy(() => TurmaScalarRelationFilterSchema), z.lazy(() => TurmaWhereInputSchema) ]).optional(),
  eventos: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  impressoes: z.lazy(() => ImpressaoListRelationFilterSchema).optional(),
}));

export const CheckinOrderByWithAggregationInputSchema: z.ZodType<Prisma.CheckinOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  culto: z.lazy(() => SortOrderSchema).optional(),
  criancaId: z.lazy(() => SortOrderSchema).optional(),
  turmaId: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CheckinCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CheckinMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CheckinMinOrderByAggregateInputSchema).optional(),
});

export const CheckinScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CheckinScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinScalarWhereWithAggregatesInputSchema), z.lazy(() => CheckinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinScalarWhereWithAggregatesInputSchema), z.lazy(() => CheckinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  culto: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  criancaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  turmaId: z.union([ z.lazy(() => EnumTurmasWithAggregatesFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const CheckinEventoWhereInputSchema: z.ZodType<Prisma.CheckinEventoWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinEventoWhereInputSchema), z.lazy(() => CheckinEventoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinEventoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinEventoWhereInputSchema), z.lazy(() => CheckinEventoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumCheckinEventosFilterSchema), z.lazy(() => CheckinEventosSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  acolhidoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutParaId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotadoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  checkin: z.union([ z.lazy(() => CheckinScalarRelationFilterSchema), z.lazy(() => CheckinWhereInputSchema) ]).optional(),
  checkinPor: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  acolhidoPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  checkoutPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  checkoutPara: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  anotadoPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
});

export const CheckinEventoOrderByWithRelationInputSchema: z.ZodType<Prisma.CheckinEventoOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  checkinPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  acolhidoPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkoutPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkoutParaId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  anotacao: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  anotadoPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsaveisNotificados: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkin: z.lazy(() => CheckinOrderByWithRelationInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelOrderByWithRelationInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelOrderByWithRelationInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
});

export const CheckinEventoWhereUniqueInputSchema: z.ZodType<Prisma.CheckinEventoWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => CheckinEventoWhereInputSchema), z.lazy(() => CheckinEventoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinEventoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinEventoWhereInputSchema), z.lazy(() => CheckinEventoWhereInputSchema).array() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumCheckinEventosFilterSchema), z.lazy(() => CheckinEventosSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  acolhidoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutParaId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotadoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  checkin: z.union([ z.lazy(() => CheckinScalarRelationFilterSchema), z.lazy(() => CheckinWhereInputSchema) ]).optional(),
  checkinPor: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  acolhidoPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  checkoutPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  checkoutPara: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  anotadoPor: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
}));

export const CheckinEventoOrderByWithAggregationInputSchema: z.ZodType<Prisma.CheckinEventoOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  checkinPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  acolhidoPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkoutPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  checkoutParaId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  anotacao: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  anotadoPorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsaveisNotificados: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CheckinEventoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CheckinEventoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CheckinEventoMinOrderByAggregateInputSchema).optional(),
});

export const CheckinEventoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CheckinEventoScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinEventoScalarWhereWithAggregatesInputSchema), z.lazy(() => CheckinEventoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinEventoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinEventoScalarWhereWithAggregatesInputSchema), z.lazy(() => CheckinEventoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumCheckinEventosWithAggregatesFilterSchema), z.lazy(() => CheckinEventosSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkinId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  checkinPorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  acolhidoPorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  checkoutPorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  checkoutParaId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  anotacao: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  anotadoPorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
});

export const ServoWhereInputSchema: z.ZodType<Prisma.ServoWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ServoWhereInputSchema), z.lazy(() => ServoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServoWhereInputSchema), z.lazy(() => ServoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoListRelationFilterSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  impressoras: z.lazy(() => ImpressoraListRelationFilterSchema).optional(),
});

export const ServoOrderByWithRelationInputSchema: z.ZodType<Prisma.ServoOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificacoesFeitas: z.lazy(() => NotificacaoOrderByRelationAggregateInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoOrderByRelationAggregateInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoOrderByRelationAggregateInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraOrderByRelationAggregateInputSchema).optional(),
});

export const ServoWhereUniqueInputSchema: z.ZodType<Prisma.ServoWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    cpf: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    cpf: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  cpf: z.string().optional(),
  AND: z.union([ z.lazy(() => ServoWhereInputSchema), z.lazy(() => ServoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServoWhereInputSchema), z.lazy(() => ServoWhereInputSchema).array() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoListRelationFilterSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoListRelationFilterSchema).optional(),
  impressoras: z.lazy(() => ImpressoraListRelationFilterSchema).optional(),
}));

export const ServoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServoOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  foto: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ServoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServoMinOrderByAggregateInputSchema).optional(),
});

export const ServoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServoScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ServoScalarWhereWithAggregatesInputSchema), z.lazy(() => ServoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServoScalarWhereWithAggregatesInputSchema), z.lazy(() => ServoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  foto: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoWithAggregatesFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const NotificacaoWhereInputSchema: z.ZodType<Prisma.NotificacaoWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificacaoWhereInputSchema), z.lazy(() => NotificacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificacaoWhereInputSchema), z.lazy(() => NotificacaoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  titulo: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoPorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificadoPor: z.union([ z.lazy(() => ServoScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
});

export const NotificacaoOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificacaoOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titulo: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoPorId: z.lazy(() => SortOrderSchema).optional(),
  notificadoPor: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoOrderByRelationAggregateInputSchema).optional(),
});

export const NotificacaoWhereUniqueInputSchema: z.ZodType<Prisma.NotificacaoWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => NotificacaoWhereInputSchema), z.lazy(() => NotificacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificacaoWhereInputSchema), z.lazy(() => NotificacaoWhereInputSchema).array() ]).optional(),
  titulo: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoPorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificadoPor: z.union([ z.lazy(() => ServoScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoListRelationFilterSchema).optional(),
}));

export const NotificacaoOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificacaoOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titulo: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoPorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificacaoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificacaoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificacaoMinOrderByAggregateInputSchema).optional(),
});

export const NotificacaoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificacaoScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  titulo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  descricao: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoPorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UsuarioNotificacaoWhereInputSchema: z.ZodType<Prisma.UsuarioNotificacaoWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UsuarioNotificacaoWhereInputSchema), z.lazy(() => UsuarioNotificacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioNotificacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioNotificacaoWhereInputSchema), z.lazy(() => UsuarioNotificacaoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lida: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacaoId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificadoParaServo: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  notificadoParaResponsavel: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  notificacao: z.union([ z.lazy(() => NotificacaoScalarRelationFilterSchema), z.lazy(() => NotificacaoWhereInputSchema) ]).optional(),
});

export const UsuarioNotificacaoOrderByWithRelationInputSchema: z.ZodType<Prisma.UsuarioNotificacaoOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  lida: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoParaServoId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificacaoId: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaServo: z.lazy(() => ServoOrderByWithRelationInputSchema).optional(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelOrderByWithRelationInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoOrderByWithRelationInputSchema).optional(),
});

export const UsuarioNotificacaoWhereUniqueInputSchema: z.ZodType<Prisma.UsuarioNotificacaoWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => UsuarioNotificacaoWhereInputSchema), z.lazy(() => UsuarioNotificacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioNotificacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioNotificacaoWhereInputSchema), z.lazy(() => UsuarioNotificacaoWhereInputSchema).array() ]).optional(),
  lida: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacaoId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificadoParaServo: z.union([ z.lazy(() => ServoNullableScalarRelationFilterSchema), z.lazy(() => ServoWhereInputSchema) ]).optional().nullable(),
  notificadoParaResponsavel: z.union([ z.lazy(() => ResponsavelNullableScalarRelationFilterSchema), z.lazy(() => ResponsavelWhereInputSchema) ]).optional().nullable(),
  notificacao: z.union([ z.lazy(() => NotificacaoScalarRelationFilterSchema), z.lazy(() => NotificacaoWhereInputSchema) ]).optional(),
}));

export const UsuarioNotificacaoOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsuarioNotificacaoOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  lida: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoParaServoId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  notificacaoId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsuarioNotificacaoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsuarioNotificacaoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsuarioNotificacaoMinOrderByAggregateInputSchema).optional(),
});

export const UsuarioNotificacaoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsuarioNotificacaoScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereWithAggregatesInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioNotificacaoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereWithAggregatesInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  lida: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  notificacaoId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const TurmaCreateInputSchema: z.ZodType<Prisma.TurmaCreateInput> = z.strictObject({
  id: z.lazy(() => TurmasSchema),
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkins: z.lazy(() => CheckinCreateNestedManyWithoutTurmaInputSchema).optional(),
});

export const TurmaUncheckedCreateInputSchema: z.ZodType<Prisma.TurmaUncheckedCreateInput> = z.strictObject({
  id: z.lazy(() => TurmasSchema),
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkins: z.lazy(() => CheckinUncheckedCreateNestedManyWithoutTurmaInputSchema).optional(),
});

export const TurmaUpdateInputSchema: z.ZodType<Prisma.TurmaUpdateInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkins: z.lazy(() => CheckinUpdateManyWithoutTurmaNestedInputSchema).optional(),
});

export const TurmaUncheckedUpdateInputSchema: z.ZodType<Prisma.TurmaUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkins: z.lazy(() => CheckinUncheckedUpdateManyWithoutTurmaNestedInputSchema).optional(),
});

export const TurmaCreateManyInputSchema: z.ZodType<Prisma.TurmaCreateManyInput> = z.strictObject({
  id: z.lazy(() => TurmasSchema),
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const TurmaUpdateManyMutationInputSchema: z.ZodType<Prisma.TurmaUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const TurmaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TurmaUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const FamiliaCreateInputSchema: z.ZodType<Prisma.FamiliaCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  criancas: z.lazy(() => CriancaCreateNestedManyWithoutFamiliaInputSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaUncheckedCreateInputSchema: z.ZodType<Prisma.FamiliaUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  criancas: z.lazy(() => CriancaUncheckedCreateNestedManyWithoutFamiliaInputSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelUncheckedCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaUpdateInputSchema: z.ZodType<Prisma.FamiliaUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  criancas: z.lazy(() => CriancaUpdateManyWithoutFamiliaNestedInputSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const FamiliaUncheckedUpdateInputSchema: z.ZodType<Prisma.FamiliaUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  criancas: z.lazy(() => CriancaUncheckedUpdateManyWithoutFamiliaNestedInputSchema).optional(),
  responsaveis: z.lazy(() => ResponsavelUncheckedUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const FamiliaCreateManyInputSchema: z.ZodType<Prisma.FamiliaCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const FamiliaUpdateManyMutationInputSchema: z.ZodType<Prisma.FamiliaUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const FamiliaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FamiliaUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CriancaCreateInputSchema: z.ZodType<Prisma.CriancaCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutCriancasInputSchema),
  checkins: z.lazy(() => CheckinCreateNestedManyWithoutCriancaInputSchema).optional(),
});

export const CriancaUncheckedCreateInputSchema: z.ZodType<Prisma.CriancaUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  checkins: z.lazy(() => CheckinUncheckedCreateNestedManyWithoutCriancaInputSchema).optional(),
});

export const CriancaUpdateInputSchema: z.ZodType<Prisma.CriancaUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutCriancasNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinUpdateManyWithoutCriancaNestedInputSchema).optional(),
});

export const CriancaUncheckedUpdateInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkins: z.lazy(() => CheckinUncheckedUpdateManyWithoutCriancaNestedInputSchema).optional(),
});

export const CriancaCreateManyInputSchema: z.ZodType<Prisma.CriancaCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
});

export const CriancaUpdateManyMutationInputSchema: z.ZodType<Prisma.CriancaUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CriancaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ResponsavelCreateInputSchema: z.ZodType<Prisma.ResponsavelCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutResponsaveisInputSchema),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelUncheckedCreateInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelUpdateInputSchema: z.ZodType<Prisma.ResponsavelUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutResponsaveisNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelCreateManyInputSchema: z.ZodType<Prisma.ResponsavelCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().optional().nullable(),
});

export const ResponsavelUpdateManyMutationInputSchema: z.ZodType<Prisma.ResponsavelUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ResponsavelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressoraCreateInputSchema: z.ZodType<Prisma.ImpressoraCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
  operador: z.lazy(() => ServoCreateNestedOneWithoutImpressorasInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutImpressoraInputSchema).optional(),
});

export const ImpressoraUncheckedCreateInputSchema: z.ZodType<Prisma.ImpressoraUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  operadorId: z.string().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutImpressoraInputSchema).optional(),
});

export const ImpressoraUpdateInputSchema: z.ZodType<Prisma.ImpressoraUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  operador: z.lazy(() => ServoUpdateOneWithoutImpressorasNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutImpressoraNestedInputSchema).optional(),
});

export const ImpressoraUncheckedUpdateInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  operadorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutImpressoraNestedInputSchema).optional(),
});

export const ImpressoraCreateManyInputSchema: z.ZodType<Prisma.ImpressoraCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  operadorId: z.string().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
});

export const ImpressoraUpdateManyMutationInputSchema: z.ZodType<Prisma.ImpressoraUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressoraUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  operadorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressaoCreateInputSchema: z.ZodType<Prisma.ImpressaoCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressora: z.lazy(() => ImpressoraCreateNestedOneWithoutImpressoesInputSchema),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutImpressoesInputSchema),
});

export const ImpressaoUncheckedCreateInputSchema: z.ZodType<Prisma.ImpressaoUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressoraId: z.string(),
  checkinId: z.string(),
});

export const ImpressaoUpdateInputSchema: z.ZodType<Prisma.ImpressaoUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressora: z.lazy(() => ImpressoraUpdateOneRequiredWithoutImpressoesNestedInputSchema).optional(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutImpressoesNestedInputSchema).optional(),
});

export const ImpressaoUncheckedUpdateInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoraId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ImpressaoCreateManyInputSchema: z.ZodType<Prisma.ImpressaoCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressoraId: z.string(),
  checkinId: z.string(),
});

export const ImpressaoUpdateManyMutationInputSchema: z.ZodType<Prisma.ImpressaoUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressaoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoraId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CheckinCreateInputSchema: z.ZodType<Prisma.CheckinCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  crianca: z.lazy(() => CriancaCreateNestedOneWithoutCheckinsInputSchema),
  turma: z.lazy(() => TurmaCreateNestedOneWithoutCheckinsInputSchema),
  eventos: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUncheckedCreateInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUpdateInputSchema: z.ZodType<Prisma.CheckinUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crianca: z.lazy(() => CriancaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  turma: z.lazy(() => TurmaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  eventos: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinCreateManyInputSchema: z.ZodType<Prisma.CheckinCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const CheckinUpdateManyMutationInputSchema: z.ZodType<Prisma.CheckinUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoCreateInputSchema: z.ZodType<Prisma.CheckinEventoCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoUpdateInputSchema: z.ZodType<Prisma.CheckinEventoUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoCreateManyInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoUpdateManyMutationInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ServoCreateInputSchema: z.ZodType<Prisma.ServoCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateInputSchema: z.ZodType<Prisma.ServoUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUpdateInputSchema: z.ZodType<Prisma.ServoUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoCreateManyInputSchema: z.ZodType<Prisma.ServoCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
});

export const ServoUpdateManyMutationInputSchema: z.ZodType<Prisma.ServoUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ServoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const NotificacaoCreateInputSchema: z.ZodType<Prisma.NotificacaoCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoPor: z.lazy(() => ServoCreateNestedOneWithoutNotificacoesFeitasInputSchema),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificacaoInputSchema).optional(),
});

export const NotificacaoUncheckedCreateInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoPorId: z.string(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificacaoInputSchema).optional(),
});

export const NotificacaoUpdateInputSchema: z.ZodType<Prisma.NotificacaoUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoPor: z.lazy(() => ServoUpdateOneRequiredWithoutNotificacoesFeitasNestedInputSchema).optional(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificacaoNestedInputSchema).optional(),
});

export const NotificacaoUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoPorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoNestedInputSchema).optional(),
});

export const NotificacaoCreateManyInputSchema: z.ZodType<Prisma.NotificacaoCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoPorId: z.string(),
});

export const NotificacaoUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const NotificacaoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoPorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UsuarioNotificacaoCreateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoCreateNestedOneWithoutUsuariosNotificadosInputSchema),
});

export const UsuarioNotificacaoUncheckedCreateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const UsuarioNotificacaoUpdateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoUpdateOneRequiredWithoutUsuariosNotificadosNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UsuarioNotificacaoCreateManyInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const UsuarioNotificacaoUpdateManyMutationInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UsuarioNotificacaoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EnumTurmasFilterSchema: z.ZodType<Prisma.EnumTurmasFilter> = z.strictObject({
  equals: z.lazy(() => TurmasSchema).optional(),
  in: z.lazy(() => TurmasSchema).array().optional(),
  notIn: z.lazy(() => TurmasSchema).array().optional(),
  not: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => NestedEnumTurmasFilterSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const CheckinListRelationFilterSchema: z.ZodType<Prisma.CheckinListRelationFilter> = z.strictObject({
  every: z.lazy(() => CheckinWhereInputSchema).optional(),
  some: z.lazy(() => CheckinWhereInputSchema).optional(),
  none: z.lazy(() => CheckinWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const CheckinOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CheckinOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const TurmaCountOrderByAggregateInputSchema: z.ZodType<Prisma.TurmaCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const TurmaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TurmaAvgOrderByAggregateInput> = z.strictObject({
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
});

export const TurmaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TurmaMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const TurmaMinOrderByAggregateInputSchema: z.ZodType<Prisma.TurmaMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const TurmaSumOrderByAggregateInputSchema: z.ZodType<Prisma.TurmaSumOrderByAggregateInput> = z.strictObject({
  idadeMinima: z.lazy(() => SortOrderSchema).optional(),
  idadeMaxima: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumTurmasWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTurmasWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => TurmasSchema).optional(),
  in: z.lazy(() => TurmasSchema).array().optional(),
  notIn: z.lazy(() => TurmasSchema).array().optional(),
  not: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => NestedEnumTurmasWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTurmasFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTurmasFilterSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const CriancaListRelationFilterSchema: z.ZodType<Prisma.CriancaListRelationFilter> = z.strictObject({
  every: z.lazy(() => CriancaWhereInputSchema).optional(),
  some: z.lazy(() => CriancaWhereInputSchema).optional(),
  none: z.lazy(() => CriancaWhereInputSchema).optional(),
});

export const ResponsavelListRelationFilterSchema: z.ZodType<Prisma.ResponsavelListRelationFilter> = z.strictObject({
  every: z.lazy(() => ResponsavelWhereInputSchema).optional(),
  some: z.lazy(() => ResponsavelWhereInputSchema).optional(),
  none: z.lazy(() => ResponsavelWhereInputSchema).optional(),
});

export const CriancaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CriancaOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ResponsavelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ResponsavelOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const FamiliaCountOrderByAggregateInputSchema: z.ZodType<Prisma.FamiliaCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const FamiliaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FamiliaMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const FamiliaMinOrderByAggregateInputSchema: z.ZodType<Prisma.FamiliaMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const EnumSexoFilterSchema: z.ZodType<Prisma.EnumSexoFilter> = z.strictObject({
  equals: z.lazy(() => SexoSchema).optional(),
  in: z.lazy(() => SexoSchema).array().optional(),
  notIn: z.lazy(() => SexoSchema).array().optional(),
  not: z.union([ z.lazy(() => SexoSchema), z.lazy(() => NestedEnumSexoFilterSchema) ]).optional(),
});

export const FamiliaScalarRelationFilterSchema: z.ZodType<Prisma.FamiliaScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => FamiliaWhereInputSchema).optional(),
  isNot: z.lazy(() => FamiliaWhereInputSchema).optional(),
});

export const CriancaCountOrderByAggregateInputSchema: z.ZodType<Prisma.CriancaCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  observacao: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  alergia: z.lazy(() => SortOrderSchema).optional(),
  condicaoMedicaMedicamento: z.lazy(() => SortOrderSchema).optional(),
  necessidadeEspecial: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
});

export const CriancaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CriancaMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  observacao: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  alergia: z.lazy(() => SortOrderSchema).optional(),
  condicaoMedicaMedicamento: z.lazy(() => SortOrderSchema).optional(),
  necessidadeEspecial: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
});

export const CriancaMinOrderByAggregateInputSchema: z.ZodType<Prisma.CriancaMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  observacao: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  alergia: z.lazy(() => SortOrderSchema).optional(),
  condicaoMedicaMedicamento: z.lazy(() => SortOrderSchema).optional(),
  necessidadeEspecial: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const EnumSexoWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSexoWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => SexoSchema).optional(),
  in: z.lazy(() => SexoSchema).array().optional(),
  notIn: z.lazy(() => SexoSchema).array().optional(),
  not: z.union([ z.lazy(() => SexoSchema), z.lazy(() => NestedEnumSexoWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSexoFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSexoFilterSchema).optional(),
});

export const EnumParentescoFilterSchema: z.ZodType<Prisma.EnumParentescoFilter> = z.strictObject({
  equals: z.lazy(() => ParentescoSchema).optional(),
  in: z.lazy(() => ParentescoSchema).array().optional(),
  notIn: z.lazy(() => ParentescoSchema).array().optional(),
  not: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => NestedEnumParentescoFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const UsuarioNotificacaoListRelationFilterSchema: z.ZodType<Prisma.UsuarioNotificacaoListRelationFilter> = z.strictObject({
  every: z.lazy(() => UsuarioNotificacaoWhereInputSchema).optional(),
  some: z.lazy(() => UsuarioNotificacaoWhereInputSchema).optional(),
  none: z.lazy(() => UsuarioNotificacaoWhereInputSchema).optional(),
});

export const CheckinEventoListRelationFilterSchema: z.ZodType<Prisma.CheckinEventoListRelationFilter> = z.strictObject({
  every: z.lazy(() => CheckinEventoWhereInputSchema).optional(),
  some: z.lazy(() => CheckinEventoWhereInputSchema).optional(),
  none: z.lazy(() => CheckinEventoWhereInputSchema).optional(),
});

export const UsuarioNotificacaoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinEventoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CheckinEventoOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ResponsavelCpfFamiliaIdCompoundUniqueInputSchema: z.ZodType<Prisma.ResponsavelCpfFamiliaIdCompoundUniqueInput> = z.strictObject({
  cpf: z.string(),
  familiaId: z.string(),
});

export const ResponsavelCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResponsavelCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  parentesco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  responsavelLegal: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const ResponsavelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResponsavelMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  parentesco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  responsavelLegal: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const ResponsavelMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResponsavelMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  parentesco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  responsavelLegal: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  familiaId: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumParentescoWithAggregatesFilterSchema: z.ZodType<Prisma.EnumParentescoWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ParentescoSchema).optional(),
  in: z.lazy(() => ParentescoSchema).array().optional(),
  notIn: z.lazy(() => ParentescoSchema).array().optional(),
  not: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => NestedEnumParentescoWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumParentescoFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumParentescoFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const ServoNullableScalarRelationFilterSchema: z.ZodType<Prisma.ServoNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ServoWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ServoWhereInputSchema).optional().nullable(),
});

export const ImpressaoListRelationFilterSchema: z.ZodType<Prisma.ImpressaoListRelationFilter> = z.strictObject({
  every: z.lazy(() => ImpressaoWhereInputSchema).optional(),
  some: z.lazy(() => ImpressaoWhereInputSchema).optional(),
  none: z.lazy(() => ImpressaoWhereInputSchema).optional(),
});

export const ImpressaoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImpressaoOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressoraCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressoraCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  mac: z.lazy(() => SortOrderSchema).optional(),
  modelo: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  operadorId: z.lazy(() => SortOrderSchema).optional(),
  ultimaConexaoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressoraMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressoraMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  mac: z.lazy(() => SortOrderSchema).optional(),
  modelo: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  operadorId: z.lazy(() => SortOrderSchema).optional(),
  ultimaConexaoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressoraMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressoraMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  mac: z.lazy(() => SortOrderSchema).optional(),
  modelo: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  operadorId: z.lazy(() => SortOrderSchema).optional(),
  ultimaConexaoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressoraScalarRelationFilterSchema: z.ZodType<Prisma.ImpressoraScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ImpressoraWhereInputSchema).optional(),
  isNot: z.lazy(() => ImpressoraWhereInputSchema).optional(),
});

export const CheckinScalarRelationFilterSchema: z.ZodType<Prisma.CheckinScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CheckinWhereInputSchema).optional(),
  isNot: z.lazy(() => CheckinWhereInputSchema).optional(),
});

export const ImpressaoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressaoCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  impressoraId: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressaoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressaoMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  impressoraId: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressaoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImpressaoMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  impressoraId: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
});

export const CriancaScalarRelationFilterSchema: z.ZodType<Prisma.CriancaScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CriancaWhereInputSchema).optional(),
  isNot: z.lazy(() => CriancaWhereInputSchema).optional(),
});

export const TurmaScalarRelationFilterSchema: z.ZodType<Prisma.TurmaScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => TurmaWhereInputSchema).optional(),
  isNot: z.lazy(() => TurmaWhereInputSchema).optional(),
});

export const CheckinCultoCriancaIdCompoundUniqueInputSchema: z.ZodType<Prisma.CheckinCultoCriancaIdCompoundUniqueInput> = z.strictObject({
  culto: z.string(),
  criancaId: z.string(),
});

export const CheckinCountOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  culto: z.lazy(() => SortOrderSchema).optional(),
  criancaId: z.lazy(() => SortOrderSchema).optional(),
  turmaId: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  culto: z.lazy(() => SortOrderSchema).optional(),
  criancaId: z.lazy(() => SortOrderSchema).optional(),
  turmaId: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinMinOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  culto: z.lazy(() => SortOrderSchema).optional(),
  criancaId: z.lazy(() => SortOrderSchema).optional(),
  turmaId: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumCheckinEventosFilterSchema: z.ZodType<Prisma.EnumCheckinEventosFilter> = z.strictObject({
  equals: z.lazy(() => CheckinEventosSchema).optional(),
  in: z.lazy(() => CheckinEventosSchema).array().optional(),
  notIn: z.lazy(() => CheckinEventosSchema).array().optional(),
  not: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => NestedEnumCheckinEventosFilterSchema) ]).optional(),
});

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.strictObject({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
});

export const ResponsavelNullableScalarRelationFilterSchema: z.ZodType<Prisma.ResponsavelNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ResponsavelWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ResponsavelWhereInputSchema).optional().nullable(),
});

export const CheckinEventoCountOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinEventoCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  checkinPorId: z.lazy(() => SortOrderSchema).optional(),
  acolhidoPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutParaId: z.lazy(() => SortOrderSchema).optional(),
  anotacao: z.lazy(() => SortOrderSchema).optional(),
  anotadoPorId: z.lazy(() => SortOrderSchema).optional(),
  responsaveisNotificados: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinEventoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinEventoMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  checkinPorId: z.lazy(() => SortOrderSchema).optional(),
  acolhidoPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutParaId: z.lazy(() => SortOrderSchema).optional(),
  anotacao: z.lazy(() => SortOrderSchema).optional(),
  anotadoPorId: z.lazy(() => SortOrderSchema).optional(),
  responsaveisNotificados: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinEventoMinOrderByAggregateInputSchema: z.ZodType<Prisma.CheckinEventoMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  checkinId: z.lazy(() => SortOrderSchema).optional(),
  checkinPorId: z.lazy(() => SortOrderSchema).optional(),
  acolhidoPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutPorId: z.lazy(() => SortOrderSchema).optional(),
  checkoutParaId: z.lazy(() => SortOrderSchema).optional(),
  anotacao: z.lazy(() => SortOrderSchema).optional(),
  anotadoPorId: z.lazy(() => SortOrderSchema).optional(),
  responsaveisNotificados: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumCheckinEventosWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCheckinEventosWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => CheckinEventosSchema).optional(),
  in: z.lazy(() => CheckinEventosSchema).array().optional(),
  notIn: z.lazy(() => CheckinEventosSchema).array().optional(),
  not: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => NestedEnumCheckinEventosWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCheckinEventosFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCheckinEventosFilterSchema).optional(),
});

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
});

export const NotificacaoListRelationFilterSchema: z.ZodType<Prisma.NotificacaoListRelationFilter> = z.strictObject({
  every: z.lazy(() => NotificacaoWhereInputSchema).optional(),
  some: z.lazy(() => NotificacaoWhereInputSchema).optional(),
  none: z.lazy(() => NotificacaoWhereInputSchema).optional(),
});

export const ImpressoraListRelationFilterSchema: z.ZodType<Prisma.ImpressoraListRelationFilter> = z.strictObject({
  every: z.lazy(() => ImpressoraWhereInputSchema).optional(),
  some: z.lazy(() => ImpressoraWhereInputSchema).optional(),
  none: z.lazy(() => ImpressoraWhereInputSchema).optional(),
});

export const NotificacaoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificacaoOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ImpressoraOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImpressoraOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ServoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServoCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const ServoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServoMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const ServoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServoMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  foto: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  sexo: z.lazy(() => SortOrderSchema).optional(),
  dataNascimento: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional(),
  endereco: z.lazy(() => SortOrderSchema).optional(),
  celula: z.lazy(() => SortOrderSchema).optional(),
  notificacoesToken: z.lazy(() => SortOrderSchema).optional(),
});

export const ServoScalarRelationFilterSchema: z.ZodType<Prisma.ServoScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ServoWhereInputSchema).optional(),
  isNot: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const NotificacaoCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titulo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoPorId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificacaoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titulo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoPorId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificacaoMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titulo: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoPorId: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificacaoScalarRelationFilterSchema: z.ZodType<Prisma.NotificacaoScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => NotificacaoWhereInputSchema).optional(),
  isNot: z.lazy(() => NotificacaoWhereInputSchema).optional(),
});

export const UsuarioNotificacaoCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  lida: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaServoId: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaResponsavelId: z.lazy(() => SortOrderSchema).optional(),
  notificacaoId: z.lazy(() => SortOrderSchema).optional(),
});

export const UsuarioNotificacaoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  lida: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaServoId: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaResponsavelId: z.lazy(() => SortOrderSchema).optional(),
  notificacaoId: z.lazy(() => SortOrderSchema).optional(),
});

export const UsuarioNotificacaoMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioNotificacaoMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  lida: z.lazy(() => SortOrderSchema).optional(),
  cadastradoEm: z.lazy(() => SortOrderSchema).optional(),
  atualizadoEm: z.lazy(() => SortOrderSchema).optional(),
  deletadoEm: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaServoId: z.lazy(() => SortOrderSchema).optional(),
  notificadoParaResponsavelId: z.lazy(() => SortOrderSchema).optional(),
  notificacaoId: z.lazy(() => SortOrderSchema).optional(),
});

export const CheckinCreateNestedManyWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinCreateNestedManyWithoutTurmaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinCreateWithoutTurmaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyTurmaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinUncheckedCreateNestedManyWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateNestedManyWithoutTurmaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinCreateWithoutTurmaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyTurmaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumTurmasFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTurmasFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => TurmasSchema).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const CheckinUpdateManyWithoutTurmaNestedInputSchema: z.ZodType<Prisma.CheckinUpdateManyWithoutTurmaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinCreateWithoutTurmaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinUpsertWithWhereUniqueWithoutTurmaInputSchema), z.lazy(() => CheckinUpsertWithWhereUniqueWithoutTurmaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyTurmaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateWithWhereUniqueWithoutTurmaInputSchema), z.lazy(() => CheckinUpdateWithWhereUniqueWithoutTurmaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinUpdateManyWithWhereWithoutTurmaInputSchema), z.lazy(() => CheckinUpdateManyWithWhereWithoutTurmaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinUncheckedUpdateManyWithoutTurmaNestedInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateManyWithoutTurmaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinCreateWithoutTurmaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutTurmaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinUpsertWithWhereUniqueWithoutTurmaInputSchema), z.lazy(() => CheckinUpsertWithWhereUniqueWithoutTurmaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyTurmaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateWithWhereUniqueWithoutTurmaInputSchema), z.lazy(() => CheckinUpdateWithWhereUniqueWithoutTurmaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinUpdateManyWithWhereWithoutTurmaInputSchema), z.lazy(() => CheckinUpdateManyWithWhereWithoutTurmaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
});

export const CriancaCreateNestedManyWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaCreateNestedManyWithoutFamiliaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateWithoutFamiliaInputSchema).array(), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CriancaCreateManyFamiliaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
});

export const ResponsavelCreateNestedManyWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelCreateNestedManyWithoutFamiliaInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema).array(), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponsavelCreateManyFamiliaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
});

export const CriancaUncheckedCreateNestedManyWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUncheckedCreateNestedManyWithoutFamiliaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateWithoutFamiliaInputSchema).array(), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CriancaCreateManyFamiliaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
});

export const ResponsavelUncheckedCreateNestedManyWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateNestedManyWithoutFamiliaInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema).array(), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponsavelCreateManyFamiliaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
});

export const CriancaUpdateManyWithoutFamiliaNestedInputSchema: z.ZodType<Prisma.CriancaUpdateManyWithoutFamiliaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateWithoutFamiliaInputSchema).array(), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CriancaUpsertWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => CriancaUpsertWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CriancaCreateManyFamiliaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CriancaUpdateWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => CriancaUpdateWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CriancaUpdateManyWithWhereWithoutFamiliaInputSchema), z.lazy(() => CriancaUpdateManyWithWhereWithoutFamiliaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CriancaScalarWhereInputSchema), z.lazy(() => CriancaScalarWhereInputSchema).array() ]).optional(),
});

export const ResponsavelUpdateManyWithoutFamiliaNestedInputSchema: z.ZodType<Prisma.ResponsavelUpdateManyWithoutFamiliaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema).array(), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponsavelUpsertWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpsertWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponsavelCreateManyFamiliaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponsavelUpdateWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpdateWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponsavelUpdateManyWithWhereWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpdateManyWithWhereWithoutFamiliaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponsavelScalarWhereInputSchema), z.lazy(() => ResponsavelScalarWhereInputSchema).array() ]).optional(),
});

export const CriancaUncheckedUpdateManyWithoutFamiliaNestedInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateManyWithoutFamiliaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateWithoutFamiliaInputSchema).array(), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => CriancaCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CriancaUpsertWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => CriancaUpsertWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CriancaCreateManyFamiliaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CriancaWhereUniqueInputSchema), z.lazy(() => CriancaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CriancaUpdateWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => CriancaUpdateWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CriancaUpdateManyWithWhereWithoutFamiliaInputSchema), z.lazy(() => CriancaUpdateManyWithWhereWithoutFamiliaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CriancaScalarWhereInputSchema), z.lazy(() => CriancaScalarWhereInputSchema).array() ]).optional(),
});

export const ResponsavelUncheckedUpdateManyWithoutFamiliaNestedInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateManyWithoutFamiliaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema).array(), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema), z.lazy(() => ResponsavelCreateOrConnectWithoutFamiliaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponsavelUpsertWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpsertWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponsavelCreateManyFamiliaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponsavelWhereUniqueInputSchema), z.lazy(() => ResponsavelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponsavelUpdateWithWhereUniqueWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpdateWithWhereUniqueWithoutFamiliaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponsavelUpdateManyWithWhereWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUpdateManyWithWhereWithoutFamiliaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponsavelScalarWhereInputSchema), z.lazy(() => ResponsavelScalarWhereInputSchema).array() ]).optional(),
});

export const FamiliaCreateNestedOneWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaCreateNestedOneWithoutCriancasInput> = z.strictObject({
  create: z.union([ z.lazy(() => FamiliaCreateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutCriancasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FamiliaCreateOrConnectWithoutCriancasInputSchema).optional(),
  connect: z.lazy(() => FamiliaWhereUniqueInputSchema).optional(),
});

export const CheckinCreateNestedManyWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinCreateNestedManyWithoutCriancaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinCreateWithoutCriancaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyCriancaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinUncheckedCreateNestedManyWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateNestedManyWithoutCriancaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinCreateWithoutCriancaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyCriancaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const EnumSexoFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSexoFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => SexoSchema).optional(),
});

export const FamiliaUpdateOneRequiredWithoutCriancasNestedInputSchema: z.ZodType<Prisma.FamiliaUpdateOneRequiredWithoutCriancasNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FamiliaCreateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutCriancasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FamiliaCreateOrConnectWithoutCriancasInputSchema).optional(),
  upsert: z.lazy(() => FamiliaUpsertWithoutCriancasInputSchema).optional(),
  connect: z.lazy(() => FamiliaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FamiliaUpdateToOneWithWhereWithoutCriancasInputSchema), z.lazy(() => FamiliaUpdateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutCriancasInputSchema) ]).optional(),
});

export const CheckinUpdateManyWithoutCriancaNestedInputSchema: z.ZodType<Prisma.CheckinUpdateManyWithoutCriancaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinCreateWithoutCriancaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinUpsertWithWhereUniqueWithoutCriancaInputSchema), z.lazy(() => CheckinUpsertWithWhereUniqueWithoutCriancaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyCriancaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateWithWhereUniqueWithoutCriancaInputSchema), z.lazy(() => CheckinUpdateWithWhereUniqueWithoutCriancaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinUpdateManyWithWhereWithoutCriancaInputSchema), z.lazy(() => CheckinUpdateManyWithWhereWithoutCriancaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinUncheckedUpdateManyWithoutCriancaNestedInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateManyWithoutCriancaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinCreateWithoutCriancaInputSchema).array(), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema), z.lazy(() => CheckinCreateOrConnectWithoutCriancaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinUpsertWithWhereUniqueWithoutCriancaInputSchema), z.lazy(() => CheckinUpsertWithWhereUniqueWithoutCriancaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinCreateManyCriancaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinWhereUniqueInputSchema), z.lazy(() => CheckinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateWithWhereUniqueWithoutCriancaInputSchema), z.lazy(() => CheckinUpdateWithWhereUniqueWithoutCriancaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinUpdateManyWithWhereWithoutCriancaInputSchema), z.lazy(() => CheckinUpdateManyWithWhereWithoutCriancaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
});

export const FamiliaCreateNestedOneWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaCreateNestedOneWithoutResponsaveisInput> = z.strictObject({
  create: z.union([ z.lazy(() => FamiliaCreateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutResponsaveisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FamiliaCreateOrConnectWithoutResponsaveisInputSchema).optional(),
  connect: z.lazy(() => FamiliaWhereUniqueInputSchema).optional(),
});

export const UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoCreateNestedManyWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutCheckinPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoCreateNestedManyWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutCheckoutParaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutParaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutParaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumParentescoFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumParentescoFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => ParentescoSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const FamiliaUpdateOneRequiredWithoutResponsaveisNestedInputSchema: z.ZodType<Prisma.FamiliaUpdateOneRequiredWithoutResponsaveisNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FamiliaCreateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutResponsaveisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FamiliaCreateOrConnectWithoutResponsaveisInputSchema).optional(),
  upsert: z.lazy(() => FamiliaUpsertWithoutResponsaveisInputSchema).optional(),
  connect: z.lazy(() => FamiliaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FamiliaUpdateToOneWithWhereWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUpdateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutResponsaveisInputSchema) ]).optional(),
});

export const UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUpdateManyWithoutCheckinPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutCheckinPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUpdateManyWithoutCheckoutParaNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutCheckoutParaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutParaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutParaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const ServoCreateNestedOneWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutImpressorasInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutImpressorasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutImpressorasInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const ImpressaoCreateNestedManyWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoCreateNestedManyWithoutImpressoraInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyImpressoraInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
});

export const ImpressaoUncheckedCreateNestedManyWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUncheckedCreateNestedManyWithoutImpressoraInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyImpressoraInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
});

export const ServoUpdateOneWithoutImpressorasNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneWithoutImpressorasNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutImpressorasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutImpressorasInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutImpressorasInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutImpressorasInputSchema), z.lazy(() => ServoUpdateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutImpressorasInputSchema) ]).optional(),
});

export const ImpressaoUpdateManyWithoutImpressoraNestedInputSchema: z.ZodType<Prisma.ImpressaoUpdateManyWithoutImpressoraNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutImpressoraInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyImpressoraInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutImpressoraInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressaoUpdateManyWithWhereWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpdateManyWithWhereWithoutImpressoraInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressaoUncheckedUpdateManyWithoutImpressoraNestedInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateManyWithoutImpressoraNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutImpressoraInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutImpressoraInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyImpressoraInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutImpressoraInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressaoUpdateManyWithWhereWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUpdateManyWithWhereWithoutImpressoraInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressoraCreateNestedOneWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraCreateNestedOneWithoutImpressoesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutImpressoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImpressoraCreateOrConnectWithoutImpressoesInputSchema).optional(),
  connect: z.lazy(() => ImpressoraWhereUniqueInputSchema).optional(),
});

export const CheckinCreateNestedOneWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinCreateNestedOneWithoutImpressoesInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutImpressoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckinCreateOrConnectWithoutImpressoesInputSchema).optional(),
  connect: z.lazy(() => CheckinWhereUniqueInputSchema).optional(),
});

export const ImpressoraUpdateOneRequiredWithoutImpressoesNestedInputSchema: z.ZodType<Prisma.ImpressoraUpdateOneRequiredWithoutImpressoesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutImpressoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImpressoraCreateOrConnectWithoutImpressoesInputSchema).optional(),
  upsert: z.lazy(() => ImpressoraUpsertWithoutImpressoesInputSchema).optional(),
  connect: z.lazy(() => ImpressoraWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ImpressoraUpdateToOneWithWhereWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUpdateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedUpdateWithoutImpressoesInputSchema) ]).optional(),
});

export const CheckinUpdateOneRequiredWithoutImpressoesNestedInputSchema: z.ZodType<Prisma.CheckinUpdateOneRequiredWithoutImpressoesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutImpressoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckinCreateOrConnectWithoutImpressoesInputSchema).optional(),
  upsert: z.lazy(() => CheckinUpsertWithoutImpressoesInputSchema).optional(),
  connect: z.lazy(() => CheckinWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateToOneWithWhereWithoutImpressoesInputSchema), z.lazy(() => CheckinUpdateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutImpressoesInputSchema) ]).optional(),
});

export const CriancaCreateNestedOneWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaCreateNestedOneWithoutCheckinsInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CriancaCreateOrConnectWithoutCheckinsInputSchema).optional(),
  connect: z.lazy(() => CriancaWhereUniqueInputSchema).optional(),
});

export const TurmaCreateNestedOneWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaCreateNestedOneWithoutCheckinsInput> = z.strictObject({
  create: z.union([ z.lazy(() => TurmaCreateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TurmaCreateOrConnectWithoutCheckinsInputSchema).optional(),
  connect: z.lazy(() => TurmaWhereUniqueInputSchema).optional(),
});

export const CheckinEventoCreateNestedManyWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutCheckinInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const ImpressaoCreateNestedManyWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoCreateNestedManyWithoutCheckinInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyCheckinInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutCheckinInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const ImpressaoUncheckedCreateNestedManyWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUncheckedCreateNestedManyWithoutCheckinInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyCheckinInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CriancaUpdateOneRequiredWithoutCheckinsNestedInputSchema: z.ZodType<Prisma.CriancaUpdateOneRequiredWithoutCheckinsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CriancaCreateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CriancaCreateOrConnectWithoutCheckinsInputSchema).optional(),
  upsert: z.lazy(() => CriancaUpsertWithoutCheckinsInputSchema).optional(),
  connect: z.lazy(() => CriancaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CriancaUpdateToOneWithWhereWithoutCheckinsInputSchema), z.lazy(() => CriancaUpdateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedUpdateWithoutCheckinsInputSchema) ]).optional(),
});

export const TurmaUpdateOneRequiredWithoutCheckinsNestedInputSchema: z.ZodType<Prisma.TurmaUpdateOneRequiredWithoutCheckinsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TurmaCreateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TurmaCreateOrConnectWithoutCheckinsInputSchema).optional(),
  upsert: z.lazy(() => TurmaUpsertWithoutCheckinsInputSchema).optional(),
  connect: z.lazy(() => TurmaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TurmaUpdateToOneWithWhereWithoutCheckinsInputSchema), z.lazy(() => TurmaUpdateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedUpdateWithoutCheckinsInputSchema) ]).optional(),
});

export const CheckinEventoUpdateManyWithoutCheckinNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutCheckinNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressaoUpdateManyWithoutCheckinNestedInputSchema: z.ZodType<Prisma.ImpressaoUpdateManyWithoutCheckinNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyCheckinInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressaoUpdateManyWithWhereWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpdateManyWithWhereWithoutCheckinInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckinInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckinInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressaoUncheckedUpdateManyWithoutCheckinNestedInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateManyWithoutCheckinNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema).array(), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema), z.lazy(() => ImpressaoCreateOrConnectWithoutCheckinInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpsertWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressaoCreateManyCheckinInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressaoWhereUniqueInputSchema), z.lazy(() => ImpressaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpdateWithWhereUniqueWithoutCheckinInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressaoUpdateManyWithWhereWithoutCheckinInputSchema), z.lazy(() => ImpressaoUpdateManyWithWhereWithoutCheckinInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinCreateNestedOneWithoutEventosInputSchema: z.ZodType<Prisma.CheckinCreateNestedOneWithoutEventosInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutEventosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckinCreateOrConnectWithoutEventosInputSchema).optional(),
  connect: z.lazy(() => CheckinWhereUniqueInputSchema).optional(),
});

export const ResponsavelCreateNestedOneWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelCreateNestedOneWithoutCheckinsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutCheckinsInputSchema).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
});

export const ServoCreateNestedOneWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutAcolhimentosInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAcolhimentosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutAcolhimentosInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const ServoCreateNestedOneWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutCheckoutsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedCreateWithoutCheckoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutCheckoutsInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const ResponsavelCreateNestedOneWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelCreateNestedOneWithoutCheckoutInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckoutInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutCheckoutInputSchema).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
});

export const ServoCreateNestedOneWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutAnotacoesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAnotacoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutAnotacoesInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const EnumCheckinEventosFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCheckinEventosFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => CheckinEventosSchema).optional(),
});

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional().nullable(),
});

export const CheckinUpdateOneRequiredWithoutEventosNestedInputSchema: z.ZodType<Prisma.CheckinUpdateOneRequiredWithoutEventosNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinCreateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutEventosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckinCreateOrConnectWithoutEventosInputSchema).optional(),
  upsert: z.lazy(() => CheckinUpsertWithoutEventosInputSchema).optional(),
  connect: z.lazy(() => CheckinWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CheckinUpdateToOneWithWhereWithoutEventosInputSchema), z.lazy(() => CheckinUpdateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutEventosInputSchema) ]).optional(),
});

export const ResponsavelUpdateOneWithoutCheckinsNestedInputSchema: z.ZodType<Prisma.ResponsavelUpdateOneWithoutCheckinsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutCheckinsInputSchema).optional(),
  upsert: z.lazy(() => ResponsavelUpsertWithoutCheckinsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResponsavelUpdateToOneWithWhereWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUpdateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckinsInputSchema) ]).optional(),
});

export const ServoUpdateOneWithoutAcolhimentosNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneWithoutAcolhimentosNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAcolhimentosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutAcolhimentosInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutAcolhimentosInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutAcolhimentosInputSchema), z.lazy(() => ServoUpdateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAcolhimentosInputSchema) ]).optional(),
});

export const ServoUpdateOneWithoutCheckoutsNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneWithoutCheckoutsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedCreateWithoutCheckoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutCheckoutsInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutCheckoutsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutCheckoutsInputSchema), z.lazy(() => ServoUpdateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutCheckoutsInputSchema) ]).optional(),
});

export const ResponsavelUpdateOneWithoutCheckoutNestedInputSchema: z.ZodType<Prisma.ResponsavelUpdateOneWithoutCheckoutNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckoutInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutCheckoutInputSchema).optional(),
  upsert: z.lazy(() => ResponsavelUpsertWithoutCheckoutInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResponsavelUpdateToOneWithWhereWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUpdateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckoutInputSchema) ]).optional(),
});

export const ServoUpdateOneWithoutAnotacoesNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneWithoutAnotacoesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAnotacoesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutAnotacoesInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutAnotacoesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutAnotacoesInputSchema), z.lazy(() => ServoUpdateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAnotacoesInputSchema) ]).optional(),
});

export const NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoCreateNestedManyWithoutNotificadoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema).array(), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificacaoCreateManyNotificadoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutAcolhidoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutCheckoutPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateNestedManyWithoutAnotadoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAnotadoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const ImpressoraCreateNestedManyWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraCreateNestedManyWithoutOperadorInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema).array(), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressoraCreateManyOperadorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema).array(), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificacaoCreateManyNotificadoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAnotadoPorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
});

export const ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUncheckedCreateNestedManyWithoutOperadorInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema).array(), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressoraCreateManyOperadorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyWithoutNotificadoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema).array(), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificacaoCreateManyNotificadoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificacaoUpdateManyWithWhereWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpdateManyWithWhereWithoutNotificadoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificacaoScalarWhereInputSchema), z.lazy(() => NotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutAcolhidoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutCheckoutPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithoutAnotadoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAnotadoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressoraUpdateManyWithoutOperadorNestedInputSchema: z.ZodType<Prisma.ImpressoraUpdateManyWithoutOperadorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema).array(), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressoraUpsertWithWhereUniqueWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpsertWithWhereUniqueWithoutOperadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressoraCreateManyOperadorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressoraUpdateWithWhereUniqueWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpdateWithWhereUniqueWithoutOperadorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressoraUpdateManyWithWhereWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpdateManyWithWhereWithoutOperadorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressoraScalarWhereInputSchema), z.lazy(() => ImpressoraScalarWhereInputSchema).array() ]).optional(),
});

export const NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema).array(), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificacaoCreateManyNotificadoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificacaoWhereUniqueInputSchema), z.lazy(() => NotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificacaoUpdateManyWithWhereWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUpdateManyWithWhereWithoutNotificadoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificacaoScalarWhereInputSchema), z.lazy(() => NotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyCheckoutPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema).array(), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckinEventoCreateManyAnotadoPorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckinEventoWhereUniqueInputSchema), z.lazy(() => CheckinEventoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
});

export const ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateManyWithoutOperadorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema).array(), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema), z.lazy(() => ImpressoraCreateOrConnectWithoutOperadorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImpressoraUpsertWithWhereUniqueWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpsertWithWhereUniqueWithoutOperadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImpressoraCreateManyOperadorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImpressoraWhereUniqueInputSchema), z.lazy(() => ImpressoraWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImpressoraUpdateWithWhereUniqueWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpdateWithWhereUniqueWithoutOperadorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImpressoraUpdateManyWithWhereWithoutOperadorInputSchema), z.lazy(() => ImpressoraUpdateManyWithWhereWithoutOperadorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImpressoraScalarWhereInputSchema), z.lazy(() => ImpressoraScalarWhereInputSchema).array() ]).optional(),
});

export const ServoCreateNestedOneWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutNotificacoesFeitasInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesFeitasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutNotificacoesFeitasInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const UsuarioNotificacaoCreateNestedManyWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateNestedManyWithoutNotificacaoInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificacaoInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
});

export const ServoUpdateOneRequiredWithoutNotificacoesFeitasNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneRequiredWithoutNotificacoesFeitasNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesFeitasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutNotificacoesFeitasInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutNotificacoesFeitasInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUpdateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesFeitasInputSchema) ]).optional(),
});

export const UsuarioNotificacaoUpdateManyWithoutNotificacaoNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithoutNotificacaoNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoNestedInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema).array(), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema), z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
});

export const ServoCreateNestedOneWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoCreateNestedOneWithoutNotificacoesRecebidasInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutNotificacoesRecebidasInputSchema).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
});

export const ResponsavelCreateNestedOneWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelCreateNestedOneWithoutNotificacoesRecebidasInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutNotificacoesRecebidasInputSchema).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
});

export const NotificacaoCreateNestedOneWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoCreateNestedOneWithoutUsuariosNotificadosInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutUsuariosNotificadosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NotificacaoCreateOrConnectWithoutUsuariosNotificadosInputSchema).optional(),
  connect: z.lazy(() => NotificacaoWhereUniqueInputSchema).optional(),
});

export const ServoUpdateOneWithoutNotificacoesRecebidasNestedInputSchema: z.ZodType<Prisma.ServoUpdateOneWithoutNotificacoesRecebidasNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServoCreateOrConnectWithoutNotificacoesRecebidasInputSchema).optional(),
  upsert: z.lazy(() => ServoUpsertWithoutNotificacoesRecebidasInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServoUpdateToOneWithWhereWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
});

export const ResponsavelUpdateOneWithoutNotificacoesRecebidasNestedInputSchema: z.ZodType<Prisma.ResponsavelUpdateOneWithoutNotificacoesRecebidasNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResponsavelCreateOrConnectWithoutNotificacoesRecebidasInputSchema).optional(),
  upsert: z.lazy(() => ResponsavelUpsertWithoutNotificacoesRecebidasInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ResponsavelWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ResponsavelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResponsavelUpdateToOneWithWhereWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]).optional(),
});

export const NotificacaoUpdateOneRequiredWithoutUsuariosNotificadosNestedInputSchema: z.ZodType<Prisma.NotificacaoUpdateOneRequiredWithoutUsuariosNotificadosNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutUsuariosNotificadosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NotificacaoCreateOrConnectWithoutUsuariosNotificadosInputSchema).optional(),
  upsert: z.lazy(() => NotificacaoUpsertWithoutUsuariosNotificadosInputSchema).optional(),
  connect: z.lazy(() => NotificacaoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NotificacaoUpdateToOneWithWhereWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUpdateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedUpdateWithoutUsuariosNotificadosInputSchema) ]).optional(),
});

export const NestedEnumTurmasFilterSchema: z.ZodType<Prisma.NestedEnumTurmasFilter> = z.strictObject({
  equals: z.lazy(() => TurmasSchema).optional(),
  in: z.lazy(() => TurmasSchema).array().optional(),
  notIn: z.lazy(() => TurmasSchema).array().optional(),
  not: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => NestedEnumTurmasFilterSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumTurmasWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTurmasWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => TurmasSchema).optional(),
  in: z.lazy(() => TurmasSchema).array().optional(),
  notIn: z.lazy(() => TurmasSchema).array().optional(),
  not: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => NestedEnumTurmasWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTurmasFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTurmasFilterSchema).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumSexoFilterSchema: z.ZodType<Prisma.NestedEnumSexoFilter> = z.strictObject({
  equals: z.lazy(() => SexoSchema).optional(),
  in: z.lazy(() => SexoSchema).array().optional(),
  notIn: z.lazy(() => SexoSchema).array().optional(),
  not: z.union([ z.lazy(() => SexoSchema), z.lazy(() => NestedEnumSexoFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedEnumSexoWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSexoWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => SexoSchema).optional(),
  in: z.lazy(() => SexoSchema).array().optional(),
  notIn: z.lazy(() => SexoSchema).array().optional(),
  not: z.union([ z.lazy(() => SexoSchema), z.lazy(() => NestedEnumSexoWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSexoFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSexoFilterSchema).optional(),
});

export const NestedEnumParentescoFilterSchema: z.ZodType<Prisma.NestedEnumParentescoFilter> = z.strictObject({
  equals: z.lazy(() => ParentescoSchema).optional(),
  in: z.lazy(() => ParentescoSchema).array().optional(),
  notIn: z.lazy(() => ParentescoSchema).array().optional(),
  not: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => NestedEnumParentescoFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedEnumParentescoWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumParentescoWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ParentescoSchema).optional(),
  in: z.lazy(() => ParentescoSchema).array().optional(),
  notIn: z.lazy(() => ParentescoSchema).array().optional(),
  not: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => NestedEnumParentescoWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumParentescoFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumParentescoFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedEnumCheckinEventosFilterSchema: z.ZodType<Prisma.NestedEnumCheckinEventosFilter> = z.strictObject({
  equals: z.lazy(() => CheckinEventosSchema).optional(),
  in: z.lazy(() => CheckinEventosSchema).array().optional(),
  notIn: z.lazy(() => CheckinEventosSchema).array().optional(),
  not: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => NestedEnumCheckinEventosFilterSchema) ]).optional(),
});

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.strictObject({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumCheckinEventosWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCheckinEventosWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => CheckinEventosSchema).optional(),
  in: z.lazy(() => CheckinEventosSchema).array().optional(),
  notIn: z.lazy(() => CheckinEventosSchema).array().optional(),
  not: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => NestedEnumCheckinEventosWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCheckinEventosFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCheckinEventosFilterSchema).optional(),
});

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
});

export const CheckinCreateWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinCreateWithoutTurmaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  crianca: z.lazy(() => CriancaCreateNestedOneWithoutCheckinsInputSchema),
  eventos: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUncheckedCreateWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateWithoutTurmaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinCreateOrConnectWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinCreateOrConnectWithoutTurmaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema) ]),
});

export const CheckinCreateManyTurmaInputEnvelopeSchema: z.ZodType<Prisma.CheckinCreateManyTurmaInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinCreateManyTurmaInputSchema), z.lazy(() => CheckinCreateManyTurmaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinUpsertWithWhereUniqueWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUpsertWithWhereUniqueWithoutTurmaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinUpdateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutTurmaInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinCreateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutTurmaInputSchema) ]),
});

export const CheckinUpdateWithWhereUniqueWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUpdateWithWhereUniqueWithoutTurmaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinUpdateWithoutTurmaInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutTurmaInputSchema) ]),
});

export const CheckinUpdateManyWithWhereWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUpdateManyWithWhereWithoutTurmaInput> = z.strictObject({
  where: z.lazy(() => CheckinScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinUpdateManyMutationInputSchema), z.lazy(() => CheckinUncheckedUpdateManyWithoutTurmaInputSchema) ]),
});

export const CheckinScalarWhereInputSchema: z.ZodType<Prisma.CheckinScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinScalarWhereInputSchema), z.lazy(() => CheckinScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  culto: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  criancaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  turmaId: z.union([ z.lazy(() => EnumTurmasFilterSchema), z.lazy(() => TurmasSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const CriancaCreateWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaCreateWithoutFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkins: z.lazy(() => CheckinCreateNestedManyWithoutCriancaInputSchema).optional(),
});

export const CriancaUncheckedCreateWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUncheckedCreateWithoutFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkins: z.lazy(() => CheckinUncheckedCreateNestedManyWithoutCriancaInputSchema).optional(),
});

export const CriancaCreateOrConnectWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaCreateOrConnectWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => CriancaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema) ]),
});

export const CriancaCreateManyFamiliaInputEnvelopeSchema: z.ZodType<Prisma.CriancaCreateManyFamiliaInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CriancaCreateManyFamiliaInputSchema), z.lazy(() => CriancaCreateManyFamiliaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ResponsavelCreateWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelCreateWithoutFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelUncheckedCreateWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateWithoutFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelCreateOrConnectWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelCreateOrConnectWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema) ]),
});

export const ResponsavelCreateManyFamiliaInputEnvelopeSchema: z.ZodType<Prisma.ResponsavelCreateManyFamiliaInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ResponsavelCreateManyFamiliaInputSchema), z.lazy(() => ResponsavelCreateManyFamiliaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CriancaUpsertWithWhereUniqueWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUpsertWithWhereUniqueWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => CriancaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CriancaUpdateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedUpdateWithoutFamiliaInputSchema) ]),
  create: z.union([ z.lazy(() => CriancaCreateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutFamiliaInputSchema) ]),
});

export const CriancaUpdateWithWhereUniqueWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUpdateWithWhereUniqueWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => CriancaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CriancaUpdateWithoutFamiliaInputSchema), z.lazy(() => CriancaUncheckedUpdateWithoutFamiliaInputSchema) ]),
});

export const CriancaUpdateManyWithWhereWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUpdateManyWithWhereWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => CriancaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CriancaUpdateManyMutationInputSchema), z.lazy(() => CriancaUncheckedUpdateManyWithoutFamiliaInputSchema) ]),
});

export const CriancaScalarWhereInputSchema: z.ZodType<Prisma.CriancaScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CriancaScalarWhereInputSchema), z.lazy(() => CriancaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CriancaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CriancaScalarWhereInputSchema), z.lazy(() => CriancaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  observacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  alergia: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ResponsavelUpsertWithWhereUniqueWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUpsertWithWhereUniqueWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ResponsavelUpdateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutFamiliaInputSchema) ]),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutFamiliaInputSchema) ]),
});

export const ResponsavelUpdateWithWhereUniqueWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUpdateWithWhereUniqueWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ResponsavelUpdateWithoutFamiliaInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutFamiliaInputSchema) ]),
});

export const ResponsavelUpdateManyWithWhereWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUpdateManyWithWhereWithoutFamiliaInput> = z.strictObject({
  where: z.lazy(() => ResponsavelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ResponsavelUpdateManyMutationInputSchema), z.lazy(() => ResponsavelUncheckedUpdateManyWithoutFamiliaInputSchema) ]),
});

export const ResponsavelScalarWhereInputSchema: z.ZodType<Prisma.ResponsavelScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ResponsavelScalarWhereInputSchema), z.lazy(() => ResponsavelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponsavelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponsavelScalarWhereInputSchema), z.lazy(() => ResponsavelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  nome: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cpf: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sexo: z.union([ z.lazy(() => EnumSexoFilterSchema), z.lazy(() => SexoSchema) ]).optional(),
  dataNascimento: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telefone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endereco: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  parentesco: z.union([ z.lazy(() => EnumParentescoFilterSchema), z.lazy(() => ParentescoSchema) ]).optional(),
  celula: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsavelLegal: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  familiaId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notificacoesToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const FamiliaCreateWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaCreateWithoutCriancasInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  responsaveis: z.lazy(() => ResponsavelCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaUncheckedCreateWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaUncheckedCreateWithoutCriancasInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  responsaveis: z.lazy(() => ResponsavelUncheckedCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaCreateOrConnectWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaCreateOrConnectWithoutCriancasInput> = z.strictObject({
  where: z.lazy(() => FamiliaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FamiliaCreateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutCriancasInputSchema) ]),
});

export const CheckinCreateWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinCreateWithoutCriancaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  turma: z.lazy(() => TurmaCreateNestedOneWithoutCheckinsInputSchema),
  eventos: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUncheckedCreateWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateWithoutCriancaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinCreateOrConnectWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinCreateOrConnectWithoutCriancaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema) ]),
});

export const CheckinCreateManyCriancaInputEnvelopeSchema: z.ZodType<Prisma.CheckinCreateManyCriancaInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinCreateManyCriancaInputSchema), z.lazy(() => CheckinCreateManyCriancaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FamiliaUpsertWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaUpsertWithoutCriancasInput> = z.strictObject({
  update: z.union([ z.lazy(() => FamiliaUpdateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutCriancasInputSchema) ]),
  create: z.union([ z.lazy(() => FamiliaCreateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutCriancasInputSchema) ]),
  where: z.lazy(() => FamiliaWhereInputSchema).optional(),
});

export const FamiliaUpdateToOneWithWhereWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaUpdateToOneWithWhereWithoutCriancasInput> = z.strictObject({
  where: z.lazy(() => FamiliaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FamiliaUpdateWithoutCriancasInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutCriancasInputSchema) ]),
});

export const FamiliaUpdateWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaUpdateWithoutCriancasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveis: z.lazy(() => ResponsavelUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const FamiliaUncheckedUpdateWithoutCriancasInputSchema: z.ZodType<Prisma.FamiliaUncheckedUpdateWithoutCriancasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveis: z.lazy(() => ResponsavelUncheckedUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const CheckinUpsertWithWhereUniqueWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUpsertWithWhereUniqueWithoutCriancaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinUpdateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutCriancaInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinCreateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutCriancaInputSchema) ]),
});

export const CheckinUpdateWithWhereUniqueWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUpdateWithWhereUniqueWithoutCriancaInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinUpdateWithoutCriancaInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutCriancaInputSchema) ]),
});

export const CheckinUpdateManyWithWhereWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUpdateManyWithWhereWithoutCriancaInput> = z.strictObject({
  where: z.lazy(() => CheckinScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinUpdateManyMutationInputSchema), z.lazy(() => CheckinUncheckedUpdateManyWithoutCriancaInputSchema) ]),
});

export const FamiliaCreateWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaCreateWithoutResponsaveisInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  criancas: z.lazy(() => CriancaCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaUncheckedCreateWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaUncheckedCreateWithoutResponsaveisInput> = z.strictObject({
  id: z.uuid().optional(),
  nome: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  criancas: z.lazy(() => CriancaUncheckedCreateNestedManyWithoutFamiliaInputSchema).optional(),
});

export const FamiliaCreateOrConnectWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaCreateOrConnectWithoutResponsaveisInput> = z.strictObject({
  where: z.lazy(() => FamiliaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FamiliaCreateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutResponsaveisInputSchema) ]),
});

export const UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoCreateNestedOneWithoutUsuariosNotificadosInputSchema),
});

export const UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaResponsavelInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema) ]),
});

export const UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelopeSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinEventoCreateWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutCheckinPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutCheckinPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutCheckinPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema) ]),
});

export const CheckinEventoCreateManyCheckinPorInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckinPorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyCheckinPorInputSchema), z.lazy(() => CheckinEventoCreateManyCheckinPorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinEventoCreateWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutCheckoutParaInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutCheckoutParaInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutCheckoutParaInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema) ]),
});

export const CheckinEventoCreateManyCheckoutParaInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckoutParaInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyCheckoutParaInputSchema), z.lazy(() => CheckinEventoCreateManyCheckoutParaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FamiliaUpsertWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaUpsertWithoutResponsaveisInput> = z.strictObject({
  update: z.union([ z.lazy(() => FamiliaUpdateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutResponsaveisInputSchema) ]),
  create: z.union([ z.lazy(() => FamiliaCreateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedCreateWithoutResponsaveisInputSchema) ]),
  where: z.lazy(() => FamiliaWhereInputSchema).optional(),
});

export const FamiliaUpdateToOneWithWhereWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaUpdateToOneWithWhereWithoutResponsaveisInput> = z.strictObject({
  where: z.lazy(() => FamiliaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FamiliaUpdateWithoutResponsaveisInputSchema), z.lazy(() => FamiliaUncheckedUpdateWithoutResponsaveisInputSchema) ]),
});

export const FamiliaUpdateWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaUpdateWithoutResponsaveisInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  criancas: z.lazy(() => CriancaUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const FamiliaUncheckedUpdateWithoutResponsaveisInputSchema: z.ZodType<Prisma.FamiliaUncheckedUpdateWithoutResponsaveisInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  criancas: z.lazy(() => CriancaUncheckedUpdateManyWithoutFamiliaNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaResponsavelInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaResponsavelInputSchema) ]),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaResponsavelInputSchema) ]),
});

export const UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaResponsavelInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificadoParaResponsavelInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaResponsavelInputSchema) ]),
});

export const UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaResponsavelInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyMutationInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelInputSchema) ]),
});

export const UsuarioNotificacaoScalarWhereInputSchema: z.ZodType<Prisma.UsuarioNotificacaoScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema), z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lida: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  notificacaoId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutCheckinPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckinPorInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinPorInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutCheckinPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckinPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckinPorInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutCheckinPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinPorInputSchema) ]),
});

export const CheckinEventoScalarWhereInputSchema: z.ZodType<Prisma.CheckinEventoScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckinEventoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckinEventoScalarWhereInputSchema), z.lazy(() => CheckinEventoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumCheckinEventosFilterSchema), z.lazy(() => CheckinEventosSchema) ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  acolhidoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkoutParaId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotacao: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  anotadoPorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutCheckoutParaInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckoutParaInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutParaInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutCheckoutParaInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckoutParaInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckoutParaInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutCheckoutParaInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutParaInputSchema) ]),
});

export const ServoCreateWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoCreateWithoutImpressorasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutImpressorasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutImpressorasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutImpressorasInputSchema) ]),
});

export const ImpressaoCreateWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoCreateWithoutImpressoraInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutImpressoesInputSchema),
});

export const ImpressaoUncheckedCreateWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUncheckedCreateWithoutImpressoraInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
});

export const ImpressaoCreateOrConnectWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoCreateOrConnectWithoutImpressoraInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema) ]),
});

export const ImpressaoCreateManyImpressoraInputEnvelopeSchema: z.ZodType<Prisma.ImpressaoCreateManyImpressoraInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ImpressaoCreateManyImpressoraInputSchema), z.lazy(() => ImpressaoCreateManyImpressoraInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ServoUpsertWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoUpsertWithoutImpressorasInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutImpressorasInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutImpressorasInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutImpressorasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutImpressorasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutImpressorasInputSchema) ]),
});

export const ServoUpdateWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoUpdateWithoutImpressorasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutImpressorasInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutImpressorasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
});

export const ImpressaoUpsertWithWhereUniqueWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUpsertWithWhereUniqueWithoutImpressoraInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedUpdateWithoutImpressoraInputSchema) ]),
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutImpressoraInputSchema) ]),
});

export const ImpressaoUpdateWithWhereUniqueWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUpdateWithWhereUniqueWithoutImpressoraInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImpressaoUpdateWithoutImpressoraInputSchema), z.lazy(() => ImpressaoUncheckedUpdateWithoutImpressoraInputSchema) ]),
});

export const ImpressaoUpdateManyWithWhereWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUpdateManyWithWhereWithoutImpressoraInput> = z.strictObject({
  where: z.lazy(() => ImpressaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImpressaoUpdateManyMutationInputSchema), z.lazy(() => ImpressaoUncheckedUpdateManyWithoutImpressoraInputSchema) ]),
});

export const ImpressaoScalarWhereInputSchema: z.ZodType<Prisma.ImpressaoScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressaoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressaoScalarWhereInputSchema), z.lazy(() => ImpressaoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  impressoraId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  checkinId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ImpressoraCreateWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraCreateWithoutImpressoesInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
  operador: z.lazy(() => ServoCreateNestedOneWithoutImpressorasInputSchema).optional(),
});

export const ImpressoraUncheckedCreateWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraUncheckedCreateWithoutImpressoesInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  operadorId: z.string().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
});

export const ImpressoraCreateOrConnectWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraCreateOrConnectWithoutImpressoesInput> = z.strictObject({
  where: z.lazy(() => ImpressoraWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutImpressoesInputSchema) ]),
});

export const CheckinCreateWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinCreateWithoutImpressoesInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  crianca: z.lazy(() => CriancaCreateNestedOneWithoutCheckinsInputSchema),
  turma: z.lazy(() => TurmaCreateNestedOneWithoutCheckinsInputSchema),
  eventos: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUncheckedCreateWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateWithoutImpressoesInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinCreateOrConnectWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinCreateOrConnectWithoutImpressoesInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinCreateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutImpressoesInputSchema) ]),
});

export const ImpressoraUpsertWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraUpsertWithoutImpressoesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ImpressoraUpdateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedUpdateWithoutImpressoesInputSchema) ]),
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutImpressoesInputSchema) ]),
  where: z.lazy(() => ImpressoraWhereInputSchema).optional(),
});

export const ImpressoraUpdateToOneWithWhereWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraUpdateToOneWithWhereWithoutImpressoesInput> = z.strictObject({
  where: z.lazy(() => ImpressoraWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ImpressoraUpdateWithoutImpressoesInputSchema), z.lazy(() => ImpressoraUncheckedUpdateWithoutImpressoesInputSchema) ]),
});

export const ImpressoraUpdateWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraUpdateWithoutImpressoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  operador: z.lazy(() => ServoUpdateOneWithoutImpressorasNestedInputSchema).optional(),
});

export const ImpressoraUncheckedUpdateWithoutImpressoesInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateWithoutImpressoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  operadorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinUpsertWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinUpsertWithoutImpressoesInput> = z.strictObject({
  update: z.union([ z.lazy(() => CheckinUpdateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutImpressoesInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinCreateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutImpressoesInputSchema) ]),
  where: z.lazy(() => CheckinWhereInputSchema).optional(),
});

export const CheckinUpdateToOneWithWhereWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinUpdateToOneWithWhereWithoutImpressoesInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CheckinUpdateWithoutImpressoesInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutImpressoesInputSchema) ]),
});

export const CheckinUpdateWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinUpdateWithoutImpressoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crianca: z.lazy(() => CriancaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  turma: z.lazy(() => TurmaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  eventos: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateWithoutImpressoesInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateWithoutImpressoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CriancaCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaCreateWithoutCheckinsInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutCriancasInputSchema),
});

export const CriancaUncheckedCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaUncheckedCreateWithoutCheckinsInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
});

export const CriancaCreateOrConnectWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaCreateOrConnectWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => CriancaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CriancaCreateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutCheckinsInputSchema) ]),
});

export const TurmaCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaCreateWithoutCheckinsInput> = z.strictObject({
  id: z.lazy(() => TurmasSchema),
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const TurmaUncheckedCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaUncheckedCreateWithoutCheckinsInput> = z.strictObject({
  id: z.lazy(() => TurmasSchema),
  descricao: z.string(),
  idadeMinima: z.number().int(),
  idadeMaxima: z.number().int(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const TurmaCreateOrConnectWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaCreateOrConnectWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => TurmaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TurmaCreateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedCreateWithoutCheckinsInputSchema) ]),
});

export const CheckinEventoCreateWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema) ]),
});

export const CheckinEventoCreateManyCheckinInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckinInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyCheckinInputSchema), z.lazy(() => CheckinEventoCreateManyCheckinInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ImpressaoCreateWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoCreateWithoutCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressora: z.lazy(() => ImpressoraCreateNestedOneWithoutImpressoesInputSchema),
});

export const ImpressaoUncheckedCreateWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUncheckedCreateWithoutCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressoraId: z.string(),
});

export const ImpressaoCreateOrConnectWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoCreateOrConnectWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema) ]),
});

export const ImpressaoCreateManyCheckinInputEnvelopeSchema: z.ZodType<Prisma.ImpressaoCreateManyCheckinInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ImpressaoCreateManyCheckinInputSchema), z.lazy(() => ImpressaoCreateManyCheckinInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CriancaUpsertWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaUpsertWithoutCheckinsInput> = z.strictObject({
  update: z.union([ z.lazy(() => CriancaUpdateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedUpdateWithoutCheckinsInputSchema) ]),
  create: z.union([ z.lazy(() => CriancaCreateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedCreateWithoutCheckinsInputSchema) ]),
  where: z.lazy(() => CriancaWhereInputSchema).optional(),
});

export const CriancaUpdateToOneWithWhereWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaUpdateToOneWithWhereWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => CriancaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CriancaUpdateWithoutCheckinsInputSchema), z.lazy(() => CriancaUncheckedUpdateWithoutCheckinsInputSchema) ]),
});

export const CriancaUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutCriancasNestedInputSchema).optional(),
});

export const CriancaUncheckedUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TurmaUpsertWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaUpsertWithoutCheckinsInput> = z.strictObject({
  update: z.union([ z.lazy(() => TurmaUpdateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedUpdateWithoutCheckinsInputSchema) ]),
  create: z.union([ z.lazy(() => TurmaCreateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedCreateWithoutCheckinsInputSchema) ]),
  where: z.lazy(() => TurmaWhereInputSchema).optional(),
});

export const TurmaUpdateToOneWithWhereWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaUpdateToOneWithWhereWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => TurmaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TurmaUpdateWithoutCheckinsInputSchema), z.lazy(() => TurmaUncheckedUpdateWithoutCheckinsInputSchema) ]),
});

export const TurmaUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const TurmaUncheckedUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.TurmaUncheckedUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMinima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idadeMaxima: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckinInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckinInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckinInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckinInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinInputSchema) ]),
});

export const ImpressaoUpsertWithWhereUniqueWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUpsertWithWhereUniqueWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImpressaoUpdateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedUpdateWithoutCheckinInputSchema) ]),
  create: z.union([ z.lazy(() => ImpressaoCreateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedCreateWithoutCheckinInputSchema) ]),
});

export const ImpressaoUpdateWithWhereUniqueWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUpdateWithWhereUniqueWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => ImpressaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImpressaoUpdateWithoutCheckinInputSchema), z.lazy(() => ImpressaoUncheckedUpdateWithoutCheckinInputSchema) ]),
});

export const ImpressaoUpdateManyWithWhereWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUpdateManyWithWhereWithoutCheckinInput> = z.strictObject({
  where: z.lazy(() => ImpressaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImpressaoUpdateManyMutationInputSchema), z.lazy(() => ImpressaoUncheckedUpdateManyWithoutCheckinInputSchema) ]),
});

export const CheckinCreateWithoutEventosInputSchema: z.ZodType<Prisma.CheckinCreateWithoutEventosInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  crianca: z.lazy(() => CriancaCreateNestedOneWithoutCheckinsInputSchema),
  turma: z.lazy(() => TurmaCreateNestedOneWithoutCheckinsInputSchema),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinUncheckedCreateWithoutEventosInputSchema: z.ZodType<Prisma.CheckinUncheckedCreateWithoutEventosInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutCheckinInputSchema).optional(),
});

export const CheckinCreateOrConnectWithoutEventosInputSchema: z.ZodType<Prisma.CheckinCreateOrConnectWithoutEventosInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinCreateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutEventosInputSchema) ]),
});

export const ResponsavelCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelCreateWithoutCheckinsInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutResponsaveisInputSchema),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelUncheckedCreateWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateWithoutCheckinsInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelCreateOrConnectWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelCreateOrConnectWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckinsInputSchema) ]),
});

export const ServoCreateWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoCreateWithoutAcolhimentosInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutAcolhimentosInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutAcolhimentosInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAcolhimentosInputSchema) ]),
});

export const ServoCreateWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoCreateWithoutCheckoutsInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutCheckoutsInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutCheckoutsInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedCreateWithoutCheckoutsInputSchema) ]),
});

export const ResponsavelCreateWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelCreateWithoutCheckoutInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutResponsaveisInputSchema),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinPorInputSchema).optional(),
});

export const ResponsavelUncheckedCreateWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateWithoutCheckoutInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaResponsavelInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInputSchema).optional(),
});

export const ResponsavelCreateOrConnectWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelCreateOrConnectWithoutCheckoutInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckoutInputSchema) ]),
});

export const ServoCreateWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoCreateWithoutAnotacoesInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutAnotacoesInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutAnotacoesInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAnotacoesInputSchema) ]),
});

export const CheckinUpsertWithoutEventosInputSchema: z.ZodType<Prisma.CheckinUpsertWithoutEventosInput> = z.strictObject({
  update: z.union([ z.lazy(() => CheckinUpdateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutEventosInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinCreateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedCreateWithoutEventosInputSchema) ]),
  where: z.lazy(() => CheckinWhereInputSchema).optional(),
});

export const CheckinUpdateToOneWithWhereWithoutEventosInputSchema: z.ZodType<Prisma.CheckinUpdateToOneWithWhereWithoutEventosInput> = z.strictObject({
  where: z.lazy(() => CheckinWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CheckinUpdateWithoutEventosInputSchema), z.lazy(() => CheckinUncheckedUpdateWithoutEventosInputSchema) ]),
});

export const CheckinUpdateWithoutEventosInputSchema: z.ZodType<Prisma.CheckinUpdateWithoutEventosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crianca: z.lazy(() => CriancaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  turma: z.lazy(() => TurmaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateWithoutEventosInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateWithoutEventosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const ResponsavelUpsertWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelUpsertWithoutCheckinsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ResponsavelUpdateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckinsInputSchema) ]),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckinsInputSchema) ]),
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
});

export const ResponsavelUpdateToOneWithWhereWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelUpdateToOneWithWhereWithoutCheckinsInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResponsavelUpdateWithoutCheckinsInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckinsInputSchema) ]),
});

export const ResponsavelUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutResponsaveisNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateWithoutCheckinsInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateWithoutCheckinsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ServoUpsertWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoUpsertWithoutAcolhimentosInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAcolhimentosInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAcolhimentosInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutAcolhimentosInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutAcolhimentosInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAcolhimentosInputSchema) ]),
});

export const ServoUpdateWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoUpdateWithoutAcolhimentosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutAcolhimentosInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutAcolhimentosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUpsertWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoUpsertWithoutCheckoutsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutCheckoutsInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedCreateWithoutCheckoutsInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutCheckoutsInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutCheckoutsInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutCheckoutsInputSchema) ]),
});

export const ServoUpdateWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoUpdateWithoutCheckoutsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutCheckoutsInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutCheckoutsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ResponsavelUpsertWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelUpsertWithoutCheckoutInput> = z.strictObject({
  update: z.union([ z.lazy(() => ResponsavelUpdateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckoutInputSchema) ]),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutCheckoutInputSchema) ]),
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
});

export const ResponsavelUpdateToOneWithWhereWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelUpdateToOneWithWhereWithoutCheckoutInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResponsavelUpdateWithoutCheckoutInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutCheckoutInputSchema) ]),
});

export const ResponsavelUpdateWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelUpdateWithoutCheckoutInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutResponsaveisNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateWithoutCheckoutInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateWithoutCheckoutInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
});

export const ServoUpsertWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoUpsertWithoutAnotacoesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAnotacoesInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedCreateWithoutAnotacoesInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutAnotacoesInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutAnotacoesInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutAnotacoesInputSchema) ]),
});

export const ServoUpdateWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoUpdateWithoutAnotacoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutAnotacoesInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutAnotacoesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const NotificacaoCreateWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoCreateWithoutNotificadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificacaoInputSchema).optional(),
});

export const NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateWithoutNotificadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificacaoInputSchema).optional(),
});

export const NotificacaoCreateOrConnectWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoCreateOrConnectWithoutNotificadoPorInput> = z.strictObject({
  where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema) ]),
});

export const NotificacaoCreateManyNotificadoPorInputEnvelopeSchema: z.ZodType<Prisma.NotificacaoCreateManyNotificadoPorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => NotificacaoCreateManyNotificadoPorInputSchema), z.lazy(() => NotificacaoCreateManyNotificadoPorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateWithoutNotificadoParaServoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoCreateNestedOneWithoutUsuariosNotificadosInputSchema),
});

export const UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateOrConnectWithoutNotificadoParaServoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema) ]),
});

export const UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelopeSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificadoParaServoInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoCreateManyNotificadoParaServoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinEventoCreateWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutAcolhidoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutAcolhidoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutAcolhidoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema) ]),
});

export const CheckinEventoCreateManyAcolhidoPorInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyAcolhidoPorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputSchema), z.lazy(() => CheckinEventoCreateManyAcolhidoPorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinEventoCreateWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutCheckoutPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoCreateNestedOneWithoutAnotacoesInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutCheckoutPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutCheckoutPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema) ]),
});

export const CheckinEventoCreateManyCheckoutPorInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckoutPorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyCheckoutPorInputSchema), z.lazy(() => CheckinEventoCreateManyCheckoutPorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CheckinEventoCreateWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateWithoutAnotadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
  checkin: z.lazy(() => CheckinCreateNestedOneWithoutEventosInputSchema),
  checkinPor: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckinsInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoCreateNestedOneWithoutAcolhimentosInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoCreateNestedOneWithoutCheckoutsInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelCreateNestedOneWithoutCheckoutInputSchema).optional(),
});

export const CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedCreateWithoutAnotadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateOrConnectWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateOrConnectWithoutAnotadoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema) ]),
});

export const CheckinEventoCreateManyAnotadoPorInputEnvelopeSchema: z.ZodType<Prisma.CheckinEventoCreateManyAnotadoPorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CheckinEventoCreateManyAnotadoPorInputSchema), z.lazy(() => CheckinEventoCreateManyAnotadoPorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ImpressoraCreateWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraCreateWithoutOperadorInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
  impressoes: z.lazy(() => ImpressaoCreateNestedManyWithoutImpressoraInputSchema).optional(),
});

export const ImpressoraUncheckedCreateWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUncheckedCreateWithoutOperadorInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedCreateNestedManyWithoutImpressoraInputSchema).optional(),
});

export const ImpressoraCreateOrConnectWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraCreateOrConnectWithoutOperadorInput> = z.strictObject({
  where: z.lazy(() => ImpressoraWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema) ]),
});

export const ImpressoraCreateManyOperadorInputEnvelopeSchema: z.ZodType<Prisma.ImpressoraCreateManyOperadorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ImpressoraCreateManyOperadorInputSchema), z.lazy(() => ImpressoraCreateManyOperadorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUpsertWithWhereUniqueWithoutNotificadoPorInput> = z.strictObject({
  where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificacaoUpdateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedUpdateWithoutNotificadoPorInputSchema) ]),
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutNotificadoPorInputSchema) ]),
});

export const NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUpdateWithWhereUniqueWithoutNotificadoPorInput> = z.strictObject({
  where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificacaoUpdateWithoutNotificadoPorInputSchema), z.lazy(() => NotificacaoUncheckedUpdateWithoutNotificadoPorInputSchema) ]),
});

export const NotificacaoUpdateManyWithWhereWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyWithWhereWithoutNotificadoPorInput> = z.strictObject({
  where: z.lazy(() => NotificacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificacaoUpdateManyMutationInputSchema), z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorInputSchema) ]),
});

export const NotificacaoScalarWhereInputSchema: z.ZodType<Prisma.NotificacaoScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificacaoScalarWhereInputSchema), z.lazy(() => NotificacaoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificacaoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificacaoScalarWhereInputSchema), z.lazy(() => NotificacaoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  titulo: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  notificadoPorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificadoParaServoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaServoInputSchema) ]),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificadoParaServoInputSchema) ]),
});

export const UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificadoParaServoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificadoParaServoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaServoInputSchema) ]),
});

export const UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithWhereWithoutNotificadoParaServoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyMutationInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoInputSchema) ]),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutAcolhidoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutAcolhidoPorInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAcolhidoPorInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutAcolhidoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutAcolhidoPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutAcolhidoPorInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutAcolhidoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorInputSchema) ]),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutCheckoutPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckoutPorInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutCheckoutPorInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutCheckoutPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutCheckoutPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutCheckoutPorInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutCheckoutPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorInputSchema) ]),
});

export const CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpsertWithWhereUniqueWithoutAnotadoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckinEventoUpdateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutAnotadoPorInputSchema) ]),
  create: z.union([ z.lazy(() => CheckinEventoCreateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedCreateWithoutAnotadoPorInputSchema) ]),
});

export const CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithWhereUniqueWithoutAnotadoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateWithoutAnotadoPorInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateWithoutAnotadoPorInputSchema) ]),
});

export const CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateManyWithWhereWithoutAnotadoPorInput> = z.strictObject({
  where: z.lazy(() => CheckinEventoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckinEventoUpdateManyMutationInputSchema), z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorInputSchema) ]),
});

export const ImpressoraUpsertWithWhereUniqueWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUpsertWithWhereUniqueWithoutOperadorInput> = z.strictObject({
  where: z.lazy(() => ImpressoraWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImpressoraUpdateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedUpdateWithoutOperadorInputSchema) ]),
  create: z.union([ z.lazy(() => ImpressoraCreateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedCreateWithoutOperadorInputSchema) ]),
});

export const ImpressoraUpdateWithWhereUniqueWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUpdateWithWhereUniqueWithoutOperadorInput> = z.strictObject({
  where: z.lazy(() => ImpressoraWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImpressoraUpdateWithoutOperadorInputSchema), z.lazy(() => ImpressoraUncheckedUpdateWithoutOperadorInputSchema) ]),
});

export const ImpressoraUpdateManyWithWhereWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUpdateManyWithWhereWithoutOperadorInput> = z.strictObject({
  where: z.lazy(() => ImpressoraScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImpressoraUpdateManyMutationInputSchema), z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorInputSchema) ]),
});

export const ImpressoraScalarWhereInputSchema: z.ZodType<Prisma.ImpressoraScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ImpressoraScalarWhereInputSchema), z.lazy(() => ImpressoraScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImpressoraScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImpressoraScalarWhereInputSchema), z.lazy(() => ImpressoraScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  mac: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modelo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  foto: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cadastradoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  atualizadoEm: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletadoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operadorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const ServoCreateWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoCreateWithoutNotificacoesFeitasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutNotificacoesFeitasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedCreateNestedManyWithoutNotificadoParaServoInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutNotificacoesFeitasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesFeitasInputSchema) ]),
});

export const UsuarioNotificacaoCreateWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateWithoutNotificacaoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelCreateNestedOneWithoutNotificacoesRecebidasInputSchema).optional(),
});

export const UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
});

export const UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateOrConnectWithoutNotificacaoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema) ]),
});

export const UsuarioNotificacaoCreateManyNotificacaoInputEnvelopeSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificacaoInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoCreateManyNotificacaoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ServoUpsertWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoUpsertWithoutNotificacoesFeitasInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesFeitasInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesFeitasInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutNotificacoesFeitasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutNotificacoesFeitasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesFeitasInputSchema) ]),
});

export const ServoUpdateWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoUpdateWithoutNotificacoesFeitasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutNotificacoesFeitasInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutNotificacoesFeitasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpsertWithWhereUniqueWithoutNotificacaoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificacaoInputSchema) ]),
  create: z.union([ z.lazy(() => UsuarioNotificacaoCreateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedCreateWithoutNotificacaoInputSchema) ]),
});

export const UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithWhereUniqueWithoutNotificacaoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateWithoutNotificacaoInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateWithoutNotificacaoInputSchema) ]),
});

export const UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyWithWhereWithoutNotificacaoInput> = z.strictObject({
  where: z.lazy(() => UsuarioNotificacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsuarioNotificacaoUpdateManyMutationInputSchema), z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoInputSchema) ]),
});

export const ServoCreateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoCreateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoUncheckedCreateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoUncheckedCreateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  celula: z.string().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedCreateNestedManyWithoutNotificadoPorInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAcolhidoPorInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutPorInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutAnotadoPorInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedCreateNestedManyWithoutOperadorInputSchema).optional(),
});

export const ServoCreateOrConnectWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoCreateOrConnectWithoutNotificacoesRecebidasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]),
});

export const ResponsavelCreateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelCreateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
  familia: z.lazy(() => FamiliaCreateNestedOneWithoutResponsaveisInputSchema),
  checkins: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  familiaId: z.string(),
  notificacoesToken: z.string().optional().nullable(),
  checkins: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckinPorInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedCreateNestedManyWithoutCheckoutParaInputSchema).optional(),
});

export const ResponsavelCreateOrConnectWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelCreateOrConnectWithoutNotificacoesRecebidasInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]),
});

export const NotificacaoCreateWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoCreateWithoutUsuariosNotificadosInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoPor: z.lazy(() => ServoCreateNestedOneWithoutNotificacoesFeitasInputSchema),
});

export const NotificacaoUncheckedCreateWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateWithoutUsuariosNotificadosInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoPorId: z.string(),
});

export const NotificacaoCreateOrConnectWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoCreateOrConnectWithoutUsuariosNotificadosInput> = z.strictObject({
  where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutUsuariosNotificadosInputSchema) ]),
});

export const ServoUpsertWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoUpsertWithoutNotificacoesRecebidasInput> = z.strictObject({
  update: z.union([ z.lazy(() => ServoUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]),
  create: z.union([ z.lazy(() => ServoCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]),
  where: z.lazy(() => ServoWhereInputSchema).optional(),
});

export const ServoUpdateToOneWithWhereWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoUpdateToOneWithWhereWithoutNotificacoesRecebidasInput> = z.strictObject({
  where: z.lazy(() => ServoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServoUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ServoUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]),
});

export const ServoUpdateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoUpdateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ServoUncheckedUpdateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ServoUncheckedUpdateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesFeitas: z.lazy(() => NotificacaoUncheckedUpdateManyWithoutNotificadoPorNestedInputSchema).optional(),
  acolhimentos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorNestedInputSchema).optional(),
  checkouts: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutPorNestedInputSchema).optional(),
  anotacoes: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutAnotadoPorNestedInputSchema).optional(),
  impressoras: z.lazy(() => ImpressoraUncheckedUpdateManyWithoutOperadorNestedInputSchema).optional(),
});

export const ResponsavelUpsertWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelUpsertWithoutNotificacoesRecebidasInput> = z.strictObject({
  update: z.union([ z.lazy(() => ResponsavelUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]),
  create: z.union([ z.lazy(() => ResponsavelCreateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedCreateWithoutNotificacoesRecebidasInputSchema) ]),
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
});

export const ResponsavelUpdateToOneWithWhereWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelUpdateToOneWithWhereWithoutNotificacoesRecebidasInput> = z.strictObject({
  where: z.lazy(() => ResponsavelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResponsavelUpdateWithoutNotificacoesRecebidasInputSchema), z.lazy(() => ResponsavelUncheckedUpdateWithoutNotificacoesRecebidasInputSchema) ]),
});

export const ResponsavelUpdateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelUpdateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familia: z.lazy(() => FamiliaUpdateOneRequiredWithoutResponsaveisNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateWithoutNotificacoesRecebidasInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateWithoutNotificacoesRecebidasInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  familiaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkins: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const NotificacaoUpsertWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoUpsertWithoutUsuariosNotificadosInput> = z.strictObject({
  update: z.union([ z.lazy(() => NotificacaoUpdateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedUpdateWithoutUsuariosNotificadosInputSchema) ]),
  create: z.union([ z.lazy(() => NotificacaoCreateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedCreateWithoutUsuariosNotificadosInputSchema) ]),
  where: z.lazy(() => NotificacaoWhereInputSchema).optional(),
});

export const NotificacaoUpdateToOneWithWhereWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoUpdateToOneWithWhereWithoutUsuariosNotificadosInput> = z.strictObject({
  where: z.lazy(() => NotificacaoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NotificacaoUpdateWithoutUsuariosNotificadosInputSchema), z.lazy(() => NotificacaoUncheckedUpdateWithoutUsuariosNotificadosInputSchema) ]),
});

export const NotificacaoUpdateWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoUpdateWithoutUsuariosNotificadosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoPor: z.lazy(() => ServoUpdateOneRequiredWithoutNotificacoesFeitasNestedInputSchema).optional(),
});

export const NotificacaoUncheckedUpdateWithoutUsuariosNotificadosInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateWithoutUsuariosNotificadosInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoPorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CheckinCreateManyTurmaInputSchema: z.ZodType<Prisma.CheckinCreateManyTurmaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  criancaId: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const CheckinUpdateWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUpdateWithoutTurmaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  crianca: z.lazy(() => CriancaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  eventos: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateWithoutTurmaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateManyWithoutTurmaInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateManyWithoutTurmaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criancaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CriancaCreateManyFamiliaInputSchema: z.ZodType<Prisma.CriancaCreateManyFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  dataNascimento: z.string(),
  sexo: z.lazy(() => SexoSchema),
  observacao: z.string().optional().nullable(),
  celula: z.string().optional().nullable(),
  alergia: z.string().optional().nullable(),
  condicaoMedicaMedicamento: z.string().optional().nullable(),
  necessidadeEspecial: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const ResponsavelCreateManyFamiliaInputSchema: z.ZodType<Prisma.ResponsavelCreateManyFamiliaInput> = z.strictObject({
  id: z.uuid().optional(),
  foto: z.string().optional().nullable(),
  nome: z.string(),
  cpf: z.string(),
  sexo: z.lazy(() => SexoSchema),
  dataNascimento: z.string(),
  telefone: z.string(),
  endereco: z.string(),
  parentesco: z.lazy(() => ParentescoSchema),
  celula: z.string().optional().nullable(),
  responsavelLegal: z.boolean(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificacoesToken: z.string().optional().nullable(),
});

export const CriancaUpdateWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUpdateWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkins: z.lazy(() => CheckinUpdateManyWithoutCriancaNestedInputSchema).optional(),
});

export const CriancaUncheckedUpdateWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkins: z.lazy(() => CheckinUncheckedUpdateManyWithoutCriancaNestedInputSchema).optional(),
});

export const CriancaUncheckedUpdateManyWithoutFamiliaInputSchema: z.ZodType<Prisma.CriancaUncheckedUpdateManyWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  observacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alergia: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  condicaoMedicaMedicamento: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  necessidadeEspecial: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ResponsavelUpdateWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUpdateWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesRecebidas: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelNestedInputSchema).optional(),
  checkins: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinPorNestedInputSchema).optional(),
  checkout: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckoutParaNestedInputSchema).optional(),
});

export const ResponsavelUncheckedUpdateManyWithoutFamiliaInputSchema: z.ZodType<Prisma.ResponsavelUncheckedUpdateManyWithoutFamiliaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cpf: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sexo: z.union([ z.lazy(() => SexoSchema), z.lazy(() => EnumSexoFieldUpdateOperationsInputSchema) ]).optional(),
  dataNascimento: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endereco: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentesco: z.union([ z.lazy(() => ParentescoSchema), z.lazy(() => EnumParentescoFieldUpdateOperationsInputSchema) ]).optional(),
  celula: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsavelLegal: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacoesToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinCreateManyCriancaInputSchema: z.ZodType<Prisma.CheckinCreateManyCriancaInput> = z.strictObject({
  id: z.uuid().optional(),
  culto: z.string(),
  turmaId: z.lazy(() => TurmasSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const CheckinUpdateWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUpdateWithoutCriancaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  turma: z.lazy(() => TurmaUpdateOneRequiredWithoutCheckinsNestedInputSchema).optional(),
  eventos: z.lazy(() => CheckinEventoUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateWithoutCriancaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventos: z.lazy(() => CheckinEventoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutCheckinNestedInputSchema).optional(),
});

export const CheckinUncheckedUpdateManyWithoutCriancaInputSchema: z.ZodType<Prisma.CheckinUncheckedUpdateManyWithoutCriancaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  culto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  turmaId: z.union([ z.lazy(() => TurmasSchema), z.lazy(() => EnumTurmasFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UsuarioNotificacaoCreateManyNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificadoParaResponsavelInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const CheckinEventoCreateManyCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckinPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateManyCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckoutParaInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const UsuarioNotificacaoUpdateWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithoutNotificadoParaResponsavelInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoUpdateOneRequiredWithoutUsuariosNotificadosNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaResponsavelInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaResponsavelInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CheckinEventoUpdateWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutCheckinPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutCheckinPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckinPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckinPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUpdateWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutCheckoutParaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutCheckoutParaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckoutParaInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckoutParaInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressaoCreateManyImpressoraInputSchema: z.ZodType<Prisma.ImpressaoCreateManyImpressoraInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
});

export const ImpressaoUpdateWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUpdateWithoutImpressoraInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutImpressoesNestedInputSchema).optional(),
});

export const ImpressaoUncheckedUpdateWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateWithoutImpressoraInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ImpressaoUncheckedUpdateManyWithoutImpressoraInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateManyWithoutImpressoraInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CheckinEventoCreateManyCheckinInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const ImpressaoCreateManyCheckinInputSchema: z.ZodType<Prisma.ImpressaoCreateManyCheckinInput> = z.strictObject({
  id: z.uuid().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  impressoraId: z.string(),
});

export const CheckinEventoUpdateWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckinInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressaoUpdateWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUpdateWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressora: z.lazy(() => ImpressoraUpdateOneRequiredWithoutImpressoesNestedInputSchema).optional(),
});

export const ImpressaoUncheckedUpdateWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoraId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ImpressaoUncheckedUpdateManyWithoutCheckinInputSchema: z.ZodType<Prisma.ImpressaoUncheckedUpdateManyWithoutCheckinInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoraId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificacaoCreateManyNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoCreateManyNotificadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  titulo: z.string().optional().nullable(),
  descricao: z.string(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
});

export const UsuarioNotificacaoCreateManyNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificadoParaServoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
  notificacaoId: z.string(),
});

export const CheckinEventoCreateManyAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyAcolhidoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateManyCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyCheckoutPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  anotadoPorId: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const CheckinEventoCreateManyAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoCreateManyAnotadoPorInput> = z.strictObject({
  id: z.uuid().optional(),
  tipo: z.lazy(() => CheckinEventosSchema),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  checkinId: z.string(),
  checkinPorId: z.string().optional().nullable(),
  acolhidoPorId: z.string().optional().nullable(),
  checkoutPorId: z.string().optional().nullable(),
  checkoutParaId: z.string().optional().nullable(),
  anotacao: z.string().optional().nullable(),
  responsaveisNotificados: z.boolean().optional().nullable(),
});

export const ImpressoraCreateManyOperadorInputSchema: z.ZodType<Prisma.ImpressoraCreateManyOperadorInput> = z.strictObject({
  id: z.uuid().optional(),
  mac: z.string(),
  modelo: z.string(),
  tipo: z.string(),
  descricao: z.string(),
  foto: z.string().optional().nullable(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  ultimaConexaoEm: z.coerce.date().optional().nullable(),
});

export const NotificacaoUpdateWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUpdateWithoutNotificadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUpdateManyWithoutNotificacaoNestedInputSchema).optional(),
});

export const NotificacaoUncheckedUpdateWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateWithoutNotificadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  usuariosNotificados: z.lazy(() => UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoNestedInputSchema).optional(),
});

export const NotificacaoUncheckedUpdateManyWithoutNotificadoPorInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyWithoutNotificadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titulo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UsuarioNotificacaoUpdateWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithoutNotificadoParaServoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
  notificacao: z.lazy(() => NotificacaoUpdateOneRequiredWithoutUsuariosNotificadosNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateWithoutNotificadoParaServoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificadoParaServoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificacaoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CheckinEventoUpdateWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutAcolhidoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutAcolhidoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutAcolhidoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUpdateWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutCheckoutPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
  anotadoPor: z.lazy(() => ServoUpdateOneWithoutAnotacoesNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutCheckoutPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutCheckoutPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutCheckoutPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotadoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUpdateWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUpdateWithoutAnotadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkin: z.lazy(() => CheckinUpdateOneRequiredWithoutEventosNestedInputSchema).optional(),
  checkinPor: z.lazy(() => ResponsavelUpdateOneWithoutCheckinsNestedInputSchema).optional(),
  acolhidoPor: z.lazy(() => ServoUpdateOneWithoutAcolhimentosNestedInputSchema).optional(),
  checkoutPor: z.lazy(() => ServoUpdateOneWithoutCheckoutsNestedInputSchema).optional(),
  checkoutPara: z.lazy(() => ResponsavelUpdateOneWithoutCheckoutNestedInputSchema).optional(),
});

export const CheckinEventoUncheckedUpdateWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateWithoutAnotadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CheckinEventoUncheckedUpdateManyWithoutAnotadoPorInputSchema: z.ZodType<Prisma.CheckinEventoUncheckedUpdateManyWithoutAnotadoPorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => CheckinEventosSchema), z.lazy(() => EnumCheckinEventosFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkinId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkinPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  acolhidoPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutPorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkoutParaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  anotacao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsaveisNotificados: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ImpressoraUpdateWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUpdateWithoutOperadorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUpdateManyWithoutImpressoraNestedInputSchema).optional(),
});

export const ImpressoraUncheckedUpdateWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateWithoutOperadorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impressoes: z.lazy(() => ImpressaoUncheckedUpdateManyWithoutImpressoraNestedInputSchema).optional(),
});

export const ImpressoraUncheckedUpdateManyWithoutOperadorInputSchema: z.ZodType<Prisma.ImpressoraUncheckedUpdateManyWithoutOperadorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mac: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  foto: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ultimaConexaoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UsuarioNotificacaoCreateManyNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyNotificacaoInput> = z.strictObject({
  id: z.uuid().optional(),
  lida: z.boolean().optional(),
  cadastradoEm: z.coerce.date().optional(),
  atualizadoEm: z.coerce.date().optional(),
  deletadoEm: z.coerce.date().optional().nullable(),
  notificadoParaServoId: z.string().optional().nullable(),
  notificadoParaResponsavelId: z.string().optional().nullable(),
});

export const UsuarioNotificacaoUpdateWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateWithoutNotificacaoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServo: z.lazy(() => ServoUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
  notificadoParaResponsavel: z.lazy(() => ResponsavelUpdateOneWithoutNotificacoesRecebidasNestedInputSchema).optional(),
});

export const UsuarioNotificacaoUncheckedUpdateWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateWithoutNotificacaoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoInputSchema: z.ZodType<Prisma.UsuarioNotificacaoUncheckedUpdateManyWithoutNotificacaoInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lida: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cadastradoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  atualizadoEm: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletadoEm: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaServoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notificadoParaResponsavelId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TurmaFindFirstArgsSchema: z.ZodType<Prisma.TurmaFindFirstArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereInputSchema.optional(), 
  orderBy: z.union([ TurmaOrderByWithRelationInputSchema.array(), TurmaOrderByWithRelationInputSchema ]).optional(),
  cursor: TurmaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TurmaScalarFieldEnumSchema, TurmaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TurmaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TurmaFindFirstOrThrowArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereInputSchema.optional(), 
  orderBy: z.union([ TurmaOrderByWithRelationInputSchema.array(), TurmaOrderByWithRelationInputSchema ]).optional(),
  cursor: TurmaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TurmaScalarFieldEnumSchema, TurmaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TurmaFindManyArgsSchema: z.ZodType<Prisma.TurmaFindManyArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereInputSchema.optional(), 
  orderBy: z.union([ TurmaOrderByWithRelationInputSchema.array(), TurmaOrderByWithRelationInputSchema ]).optional(),
  cursor: TurmaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TurmaScalarFieldEnumSchema, TurmaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TurmaAggregateArgsSchema: z.ZodType<Prisma.TurmaAggregateArgs> = z.object({
  where: TurmaWhereInputSchema.optional(), 
  orderBy: z.union([ TurmaOrderByWithRelationInputSchema.array(), TurmaOrderByWithRelationInputSchema ]).optional(),
  cursor: TurmaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TurmaGroupByArgsSchema: z.ZodType<Prisma.TurmaGroupByArgs> = z.object({
  where: TurmaWhereInputSchema.optional(), 
  orderBy: z.union([ TurmaOrderByWithAggregationInputSchema.array(), TurmaOrderByWithAggregationInputSchema ]).optional(),
  by: TurmaScalarFieldEnumSchema.array(), 
  having: TurmaScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TurmaFindUniqueArgsSchema: z.ZodType<Prisma.TurmaFindUniqueArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereUniqueInputSchema, 
}).strict();

export const TurmaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TurmaFindUniqueOrThrowArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereUniqueInputSchema, 
}).strict();

export const FamiliaFindFirstArgsSchema: z.ZodType<Prisma.FamiliaFindFirstArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereInputSchema.optional(), 
  orderBy: z.union([ FamiliaOrderByWithRelationInputSchema.array(), FamiliaOrderByWithRelationInputSchema ]).optional(),
  cursor: FamiliaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FamiliaScalarFieldEnumSchema, FamiliaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FamiliaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FamiliaFindFirstOrThrowArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereInputSchema.optional(), 
  orderBy: z.union([ FamiliaOrderByWithRelationInputSchema.array(), FamiliaOrderByWithRelationInputSchema ]).optional(),
  cursor: FamiliaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FamiliaScalarFieldEnumSchema, FamiliaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FamiliaFindManyArgsSchema: z.ZodType<Prisma.FamiliaFindManyArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereInputSchema.optional(), 
  orderBy: z.union([ FamiliaOrderByWithRelationInputSchema.array(), FamiliaOrderByWithRelationInputSchema ]).optional(),
  cursor: FamiliaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FamiliaScalarFieldEnumSchema, FamiliaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FamiliaAggregateArgsSchema: z.ZodType<Prisma.FamiliaAggregateArgs> = z.object({
  where: FamiliaWhereInputSchema.optional(), 
  orderBy: z.union([ FamiliaOrderByWithRelationInputSchema.array(), FamiliaOrderByWithRelationInputSchema ]).optional(),
  cursor: FamiliaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FamiliaGroupByArgsSchema: z.ZodType<Prisma.FamiliaGroupByArgs> = z.object({
  where: FamiliaWhereInputSchema.optional(), 
  orderBy: z.union([ FamiliaOrderByWithAggregationInputSchema.array(), FamiliaOrderByWithAggregationInputSchema ]).optional(),
  by: FamiliaScalarFieldEnumSchema.array(), 
  having: FamiliaScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FamiliaFindUniqueArgsSchema: z.ZodType<Prisma.FamiliaFindUniqueArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereUniqueInputSchema, 
}).strict();

export const FamiliaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FamiliaFindUniqueOrThrowArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereUniqueInputSchema, 
}).strict();

export const CriancaFindFirstArgsSchema: z.ZodType<Prisma.CriancaFindFirstArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereInputSchema.optional(), 
  orderBy: z.union([ CriancaOrderByWithRelationInputSchema.array(), CriancaOrderByWithRelationInputSchema ]).optional(),
  cursor: CriancaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CriancaScalarFieldEnumSchema, CriancaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CriancaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CriancaFindFirstOrThrowArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereInputSchema.optional(), 
  orderBy: z.union([ CriancaOrderByWithRelationInputSchema.array(), CriancaOrderByWithRelationInputSchema ]).optional(),
  cursor: CriancaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CriancaScalarFieldEnumSchema, CriancaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CriancaFindManyArgsSchema: z.ZodType<Prisma.CriancaFindManyArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereInputSchema.optional(), 
  orderBy: z.union([ CriancaOrderByWithRelationInputSchema.array(), CriancaOrderByWithRelationInputSchema ]).optional(),
  cursor: CriancaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CriancaScalarFieldEnumSchema, CriancaScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CriancaAggregateArgsSchema: z.ZodType<Prisma.CriancaAggregateArgs> = z.object({
  where: CriancaWhereInputSchema.optional(), 
  orderBy: z.union([ CriancaOrderByWithRelationInputSchema.array(), CriancaOrderByWithRelationInputSchema ]).optional(),
  cursor: CriancaWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CriancaGroupByArgsSchema: z.ZodType<Prisma.CriancaGroupByArgs> = z.object({
  where: CriancaWhereInputSchema.optional(), 
  orderBy: z.union([ CriancaOrderByWithAggregationInputSchema.array(), CriancaOrderByWithAggregationInputSchema ]).optional(),
  by: CriancaScalarFieldEnumSchema.array(), 
  having: CriancaScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CriancaFindUniqueArgsSchema: z.ZodType<Prisma.CriancaFindUniqueArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereUniqueInputSchema, 
}).strict();

export const CriancaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CriancaFindUniqueOrThrowArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereUniqueInputSchema, 
}).strict();

export const ResponsavelFindFirstArgsSchema: z.ZodType<Prisma.ResponsavelFindFirstArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereInputSchema.optional(), 
  orderBy: z.union([ ResponsavelOrderByWithRelationInputSchema.array(), ResponsavelOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponsavelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponsavelScalarFieldEnumSchema, ResponsavelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResponsavelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResponsavelFindFirstOrThrowArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereInputSchema.optional(), 
  orderBy: z.union([ ResponsavelOrderByWithRelationInputSchema.array(), ResponsavelOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponsavelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponsavelScalarFieldEnumSchema, ResponsavelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResponsavelFindManyArgsSchema: z.ZodType<Prisma.ResponsavelFindManyArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereInputSchema.optional(), 
  orderBy: z.union([ ResponsavelOrderByWithRelationInputSchema.array(), ResponsavelOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponsavelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponsavelScalarFieldEnumSchema, ResponsavelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResponsavelAggregateArgsSchema: z.ZodType<Prisma.ResponsavelAggregateArgs> = z.object({
  where: ResponsavelWhereInputSchema.optional(), 
  orderBy: z.union([ ResponsavelOrderByWithRelationInputSchema.array(), ResponsavelOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponsavelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ResponsavelGroupByArgsSchema: z.ZodType<Prisma.ResponsavelGroupByArgs> = z.object({
  where: ResponsavelWhereInputSchema.optional(), 
  orderBy: z.union([ ResponsavelOrderByWithAggregationInputSchema.array(), ResponsavelOrderByWithAggregationInputSchema ]).optional(),
  by: ResponsavelScalarFieldEnumSchema.array(), 
  having: ResponsavelScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ResponsavelFindUniqueArgsSchema: z.ZodType<Prisma.ResponsavelFindUniqueArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereUniqueInputSchema, 
}).strict();

export const ResponsavelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResponsavelFindUniqueOrThrowArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereUniqueInputSchema, 
}).strict();

export const ImpressoraFindFirstArgsSchema: z.ZodType<Prisma.ImpressoraFindFirstArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressoraOrderByWithRelationInputSchema.array(), ImpressoraOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressoraWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressoraScalarFieldEnumSchema, ImpressoraScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressoraFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImpressoraFindFirstOrThrowArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressoraOrderByWithRelationInputSchema.array(), ImpressoraOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressoraWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressoraScalarFieldEnumSchema, ImpressoraScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressoraFindManyArgsSchema: z.ZodType<Prisma.ImpressoraFindManyArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressoraOrderByWithRelationInputSchema.array(), ImpressoraOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressoraWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressoraScalarFieldEnumSchema, ImpressoraScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressoraAggregateArgsSchema: z.ZodType<Prisma.ImpressoraAggregateArgs> = z.object({
  where: ImpressoraWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressoraOrderByWithRelationInputSchema.array(), ImpressoraOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressoraWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImpressoraGroupByArgsSchema: z.ZodType<Prisma.ImpressoraGroupByArgs> = z.object({
  where: ImpressoraWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressoraOrderByWithAggregationInputSchema.array(), ImpressoraOrderByWithAggregationInputSchema ]).optional(),
  by: ImpressoraScalarFieldEnumSchema.array(), 
  having: ImpressoraScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImpressoraFindUniqueArgsSchema: z.ZodType<Prisma.ImpressoraFindUniqueArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereUniqueInputSchema, 
}).strict();

export const ImpressoraFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImpressoraFindUniqueOrThrowArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereUniqueInputSchema, 
}).strict();

export const ImpressaoFindFirstArgsSchema: z.ZodType<Prisma.ImpressaoFindFirstArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressaoOrderByWithRelationInputSchema.array(), ImpressaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressaoScalarFieldEnumSchema, ImpressaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressaoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImpressaoFindFirstOrThrowArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressaoOrderByWithRelationInputSchema.array(), ImpressaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressaoScalarFieldEnumSchema, ImpressaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressaoFindManyArgsSchema: z.ZodType<Prisma.ImpressaoFindManyArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressaoOrderByWithRelationInputSchema.array(), ImpressaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImpressaoScalarFieldEnumSchema, ImpressaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ImpressaoAggregateArgsSchema: z.ZodType<Prisma.ImpressaoAggregateArgs> = z.object({
  where: ImpressaoWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressaoOrderByWithRelationInputSchema.array(), ImpressaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ImpressaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImpressaoGroupByArgsSchema: z.ZodType<Prisma.ImpressaoGroupByArgs> = z.object({
  where: ImpressaoWhereInputSchema.optional(), 
  orderBy: z.union([ ImpressaoOrderByWithAggregationInputSchema.array(), ImpressaoOrderByWithAggregationInputSchema ]).optional(),
  by: ImpressaoScalarFieldEnumSchema.array(), 
  having: ImpressaoScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImpressaoFindUniqueArgsSchema: z.ZodType<Prisma.ImpressaoFindUniqueArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereUniqueInputSchema, 
}).strict();

export const ImpressaoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImpressaoFindUniqueOrThrowArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereUniqueInputSchema, 
}).strict();

export const CheckinFindFirstArgsSchema: z.ZodType<Prisma.CheckinFindFirstArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinOrderByWithRelationInputSchema.array(), CheckinOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinScalarFieldEnumSchema, CheckinScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CheckinFindFirstOrThrowArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinOrderByWithRelationInputSchema.array(), CheckinOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinScalarFieldEnumSchema, CheckinScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinFindManyArgsSchema: z.ZodType<Prisma.CheckinFindManyArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinOrderByWithRelationInputSchema.array(), CheckinOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinScalarFieldEnumSchema, CheckinScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinAggregateArgsSchema: z.ZodType<Prisma.CheckinAggregateArgs> = z.object({
  where: CheckinWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinOrderByWithRelationInputSchema.array(), CheckinOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CheckinGroupByArgsSchema: z.ZodType<Prisma.CheckinGroupByArgs> = z.object({
  where: CheckinWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinOrderByWithAggregationInputSchema.array(), CheckinOrderByWithAggregationInputSchema ]).optional(),
  by: CheckinScalarFieldEnumSchema.array(), 
  having: CheckinScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CheckinFindUniqueArgsSchema: z.ZodType<Prisma.CheckinFindUniqueArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereUniqueInputSchema, 
}).strict();

export const CheckinFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CheckinFindUniqueOrThrowArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereUniqueInputSchema, 
}).strict();

export const CheckinEventoFindFirstArgsSchema: z.ZodType<Prisma.CheckinEventoFindFirstArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinEventoOrderByWithRelationInputSchema.array(), CheckinEventoOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinEventoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinEventoScalarFieldEnumSchema, CheckinEventoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinEventoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CheckinEventoFindFirstOrThrowArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinEventoOrderByWithRelationInputSchema.array(), CheckinEventoOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinEventoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinEventoScalarFieldEnumSchema, CheckinEventoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinEventoFindManyArgsSchema: z.ZodType<Prisma.CheckinEventoFindManyArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinEventoOrderByWithRelationInputSchema.array(), CheckinEventoOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinEventoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckinEventoScalarFieldEnumSchema, CheckinEventoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CheckinEventoAggregateArgsSchema: z.ZodType<Prisma.CheckinEventoAggregateArgs> = z.object({
  where: CheckinEventoWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinEventoOrderByWithRelationInputSchema.array(), CheckinEventoOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckinEventoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CheckinEventoGroupByArgsSchema: z.ZodType<Prisma.CheckinEventoGroupByArgs> = z.object({
  where: CheckinEventoWhereInputSchema.optional(), 
  orderBy: z.union([ CheckinEventoOrderByWithAggregationInputSchema.array(), CheckinEventoOrderByWithAggregationInputSchema ]).optional(),
  by: CheckinEventoScalarFieldEnumSchema.array(), 
  having: CheckinEventoScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CheckinEventoFindUniqueArgsSchema: z.ZodType<Prisma.CheckinEventoFindUniqueArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereUniqueInputSchema, 
}).strict();

export const CheckinEventoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CheckinEventoFindUniqueOrThrowArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereUniqueInputSchema, 
}).strict();

export const ServoFindFirstArgsSchema: z.ZodType<Prisma.ServoFindFirstArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereInputSchema.optional(), 
  orderBy: z.union([ ServoOrderByWithRelationInputSchema.array(), ServoOrderByWithRelationInputSchema ]).optional(),
  cursor: ServoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServoScalarFieldEnumSchema, ServoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ServoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServoFindFirstOrThrowArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereInputSchema.optional(), 
  orderBy: z.union([ ServoOrderByWithRelationInputSchema.array(), ServoOrderByWithRelationInputSchema ]).optional(),
  cursor: ServoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServoScalarFieldEnumSchema, ServoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ServoFindManyArgsSchema: z.ZodType<Prisma.ServoFindManyArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereInputSchema.optional(), 
  orderBy: z.union([ ServoOrderByWithRelationInputSchema.array(), ServoOrderByWithRelationInputSchema ]).optional(),
  cursor: ServoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServoScalarFieldEnumSchema, ServoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ServoAggregateArgsSchema: z.ZodType<Prisma.ServoAggregateArgs> = z.object({
  where: ServoWhereInputSchema.optional(), 
  orderBy: z.union([ ServoOrderByWithRelationInputSchema.array(), ServoOrderByWithRelationInputSchema ]).optional(),
  cursor: ServoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ServoGroupByArgsSchema: z.ZodType<Prisma.ServoGroupByArgs> = z.object({
  where: ServoWhereInputSchema.optional(), 
  orderBy: z.union([ ServoOrderByWithAggregationInputSchema.array(), ServoOrderByWithAggregationInputSchema ]).optional(),
  by: ServoScalarFieldEnumSchema.array(), 
  having: ServoScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ServoFindUniqueArgsSchema: z.ZodType<Prisma.ServoFindUniqueArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereUniqueInputSchema, 
}).strict();

export const ServoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServoFindUniqueOrThrowArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereUniqueInputSchema, 
}).strict();

export const NotificacaoFindFirstArgsSchema: z.ZodType<Prisma.NotificacaoFindFirstArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ NotificacaoOrderByWithRelationInputSchema.array(), NotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificacaoScalarFieldEnumSchema, NotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificacaoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificacaoFindFirstOrThrowArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ NotificacaoOrderByWithRelationInputSchema.array(), NotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificacaoScalarFieldEnumSchema, NotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificacaoFindManyArgsSchema: z.ZodType<Prisma.NotificacaoFindManyArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ NotificacaoOrderByWithRelationInputSchema.array(), NotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificacaoScalarFieldEnumSchema, NotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificacaoAggregateArgsSchema: z.ZodType<Prisma.NotificacaoAggregateArgs> = z.object({
  where: NotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ NotificacaoOrderByWithRelationInputSchema.array(), NotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificacaoGroupByArgsSchema: z.ZodType<Prisma.NotificacaoGroupByArgs> = z.object({
  where: NotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ NotificacaoOrderByWithAggregationInputSchema.array(), NotificacaoOrderByWithAggregationInputSchema ]).optional(),
  by: NotificacaoScalarFieldEnumSchema.array(), 
  having: NotificacaoScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificacaoFindUniqueArgsSchema: z.ZodType<Prisma.NotificacaoFindUniqueArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereUniqueInputSchema, 
}).strict();

export const NotificacaoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificacaoFindUniqueOrThrowArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereUniqueInputSchema, 
}).strict();

export const UsuarioNotificacaoFindFirstArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoFindFirstArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ UsuarioNotificacaoOrderByWithRelationInputSchema.array(), UsuarioNotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioNotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioNotificacaoScalarFieldEnumSchema, UsuarioNotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UsuarioNotificacaoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoFindFirstOrThrowArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ UsuarioNotificacaoOrderByWithRelationInputSchema.array(), UsuarioNotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioNotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioNotificacaoScalarFieldEnumSchema, UsuarioNotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UsuarioNotificacaoFindManyArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoFindManyArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ UsuarioNotificacaoOrderByWithRelationInputSchema.array(), UsuarioNotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioNotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioNotificacaoScalarFieldEnumSchema, UsuarioNotificacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UsuarioNotificacaoAggregateArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoAggregateArgs> = z.object({
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ UsuarioNotificacaoOrderByWithRelationInputSchema.array(), UsuarioNotificacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioNotificacaoWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UsuarioNotificacaoGroupByArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoGroupByArgs> = z.object({
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  orderBy: z.union([ UsuarioNotificacaoOrderByWithAggregationInputSchema.array(), UsuarioNotificacaoOrderByWithAggregationInputSchema ]).optional(),
  by: UsuarioNotificacaoScalarFieldEnumSchema.array(), 
  having: UsuarioNotificacaoScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UsuarioNotificacaoFindUniqueArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoFindUniqueArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereUniqueInputSchema, 
}).strict();

export const UsuarioNotificacaoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoFindUniqueOrThrowArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereUniqueInputSchema, 
}).strict();

export const TurmaCreateArgsSchema: z.ZodType<Prisma.TurmaCreateArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  data: z.union([ TurmaCreateInputSchema, TurmaUncheckedCreateInputSchema ]),
}).strict();

export const TurmaUpsertArgsSchema: z.ZodType<Prisma.TurmaUpsertArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereUniqueInputSchema, 
  create: z.union([ TurmaCreateInputSchema, TurmaUncheckedCreateInputSchema ]),
  update: z.union([ TurmaUpdateInputSchema, TurmaUncheckedUpdateInputSchema ]),
}).strict();

export const TurmaCreateManyArgsSchema: z.ZodType<Prisma.TurmaCreateManyArgs> = z.object({
  data: z.union([ TurmaCreateManyInputSchema, TurmaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TurmaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TurmaCreateManyAndReturnArgs> = z.object({
  data: z.union([ TurmaCreateManyInputSchema, TurmaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TurmaDeleteArgsSchema: z.ZodType<Prisma.TurmaDeleteArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  where: TurmaWhereUniqueInputSchema, 
}).strict();

export const TurmaUpdateArgsSchema: z.ZodType<Prisma.TurmaUpdateArgs> = z.object({
  select: TurmaSelectSchema.optional(),
  include: TurmaIncludeSchema.optional(),
  data: z.union([ TurmaUpdateInputSchema, TurmaUncheckedUpdateInputSchema ]),
  where: TurmaWhereUniqueInputSchema, 
}).strict();

export const TurmaUpdateManyArgsSchema: z.ZodType<Prisma.TurmaUpdateManyArgs> = z.object({
  data: z.union([ TurmaUpdateManyMutationInputSchema, TurmaUncheckedUpdateManyInputSchema ]),
  where: TurmaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TurmaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TurmaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TurmaUpdateManyMutationInputSchema, TurmaUncheckedUpdateManyInputSchema ]),
  where: TurmaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TurmaDeleteManyArgsSchema: z.ZodType<Prisma.TurmaDeleteManyArgs> = z.object({
  where: TurmaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FamiliaCreateArgsSchema: z.ZodType<Prisma.FamiliaCreateArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  data: z.union([ FamiliaCreateInputSchema, FamiliaUncheckedCreateInputSchema ]),
}).strict();

export const FamiliaUpsertArgsSchema: z.ZodType<Prisma.FamiliaUpsertArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereUniqueInputSchema, 
  create: z.union([ FamiliaCreateInputSchema, FamiliaUncheckedCreateInputSchema ]),
  update: z.union([ FamiliaUpdateInputSchema, FamiliaUncheckedUpdateInputSchema ]),
}).strict();

export const FamiliaCreateManyArgsSchema: z.ZodType<Prisma.FamiliaCreateManyArgs> = z.object({
  data: z.union([ FamiliaCreateManyInputSchema, FamiliaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FamiliaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FamiliaCreateManyAndReturnArgs> = z.object({
  data: z.union([ FamiliaCreateManyInputSchema, FamiliaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FamiliaDeleteArgsSchema: z.ZodType<Prisma.FamiliaDeleteArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  where: FamiliaWhereUniqueInputSchema, 
}).strict();

export const FamiliaUpdateArgsSchema: z.ZodType<Prisma.FamiliaUpdateArgs> = z.object({
  select: FamiliaSelectSchema.optional(),
  include: FamiliaIncludeSchema.optional(),
  data: z.union([ FamiliaUpdateInputSchema, FamiliaUncheckedUpdateInputSchema ]),
  where: FamiliaWhereUniqueInputSchema, 
}).strict();

export const FamiliaUpdateManyArgsSchema: z.ZodType<Prisma.FamiliaUpdateManyArgs> = z.object({
  data: z.union([ FamiliaUpdateManyMutationInputSchema, FamiliaUncheckedUpdateManyInputSchema ]),
  where: FamiliaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FamiliaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FamiliaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FamiliaUpdateManyMutationInputSchema, FamiliaUncheckedUpdateManyInputSchema ]),
  where: FamiliaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FamiliaDeleteManyArgsSchema: z.ZodType<Prisma.FamiliaDeleteManyArgs> = z.object({
  where: FamiliaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CriancaCreateArgsSchema: z.ZodType<Prisma.CriancaCreateArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  data: z.union([ CriancaCreateInputSchema, CriancaUncheckedCreateInputSchema ]),
}).strict();

export const CriancaUpsertArgsSchema: z.ZodType<Prisma.CriancaUpsertArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereUniqueInputSchema, 
  create: z.union([ CriancaCreateInputSchema, CriancaUncheckedCreateInputSchema ]),
  update: z.union([ CriancaUpdateInputSchema, CriancaUncheckedUpdateInputSchema ]),
}).strict();

export const CriancaCreateManyArgsSchema: z.ZodType<Prisma.CriancaCreateManyArgs> = z.object({
  data: z.union([ CriancaCreateManyInputSchema, CriancaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CriancaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CriancaCreateManyAndReturnArgs> = z.object({
  data: z.union([ CriancaCreateManyInputSchema, CriancaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CriancaDeleteArgsSchema: z.ZodType<Prisma.CriancaDeleteArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  where: CriancaWhereUniqueInputSchema, 
}).strict();

export const CriancaUpdateArgsSchema: z.ZodType<Prisma.CriancaUpdateArgs> = z.object({
  select: CriancaSelectSchema.optional(),
  include: CriancaIncludeSchema.optional(),
  data: z.union([ CriancaUpdateInputSchema, CriancaUncheckedUpdateInputSchema ]),
  where: CriancaWhereUniqueInputSchema, 
}).strict();

export const CriancaUpdateManyArgsSchema: z.ZodType<Prisma.CriancaUpdateManyArgs> = z.object({
  data: z.union([ CriancaUpdateManyMutationInputSchema, CriancaUncheckedUpdateManyInputSchema ]),
  where: CriancaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CriancaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CriancaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CriancaUpdateManyMutationInputSchema, CriancaUncheckedUpdateManyInputSchema ]),
  where: CriancaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CriancaDeleteManyArgsSchema: z.ZodType<Prisma.CriancaDeleteManyArgs> = z.object({
  where: CriancaWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ResponsavelCreateArgsSchema: z.ZodType<Prisma.ResponsavelCreateArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  data: z.union([ ResponsavelCreateInputSchema, ResponsavelUncheckedCreateInputSchema ]),
}).strict();

export const ResponsavelUpsertArgsSchema: z.ZodType<Prisma.ResponsavelUpsertArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereUniqueInputSchema, 
  create: z.union([ ResponsavelCreateInputSchema, ResponsavelUncheckedCreateInputSchema ]),
  update: z.union([ ResponsavelUpdateInputSchema, ResponsavelUncheckedUpdateInputSchema ]),
}).strict();

export const ResponsavelCreateManyArgsSchema: z.ZodType<Prisma.ResponsavelCreateManyArgs> = z.object({
  data: z.union([ ResponsavelCreateManyInputSchema, ResponsavelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ResponsavelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ResponsavelCreateManyAndReturnArgs> = z.object({
  data: z.union([ ResponsavelCreateManyInputSchema, ResponsavelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ResponsavelDeleteArgsSchema: z.ZodType<Prisma.ResponsavelDeleteArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  where: ResponsavelWhereUniqueInputSchema, 
}).strict();

export const ResponsavelUpdateArgsSchema: z.ZodType<Prisma.ResponsavelUpdateArgs> = z.object({
  select: ResponsavelSelectSchema.optional(),
  include: ResponsavelIncludeSchema.optional(),
  data: z.union([ ResponsavelUpdateInputSchema, ResponsavelUncheckedUpdateInputSchema ]),
  where: ResponsavelWhereUniqueInputSchema, 
}).strict();

export const ResponsavelUpdateManyArgsSchema: z.ZodType<Prisma.ResponsavelUpdateManyArgs> = z.object({
  data: z.union([ ResponsavelUpdateManyMutationInputSchema, ResponsavelUncheckedUpdateManyInputSchema ]),
  where: ResponsavelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ResponsavelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ResponsavelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ResponsavelUpdateManyMutationInputSchema, ResponsavelUncheckedUpdateManyInputSchema ]),
  where: ResponsavelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ResponsavelDeleteManyArgsSchema: z.ZodType<Prisma.ResponsavelDeleteManyArgs> = z.object({
  where: ResponsavelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressoraCreateArgsSchema: z.ZodType<Prisma.ImpressoraCreateArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  data: z.union([ ImpressoraCreateInputSchema, ImpressoraUncheckedCreateInputSchema ]),
}).strict();

export const ImpressoraUpsertArgsSchema: z.ZodType<Prisma.ImpressoraUpsertArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereUniqueInputSchema, 
  create: z.union([ ImpressoraCreateInputSchema, ImpressoraUncheckedCreateInputSchema ]),
  update: z.union([ ImpressoraUpdateInputSchema, ImpressoraUncheckedUpdateInputSchema ]),
}).strict();

export const ImpressoraCreateManyArgsSchema: z.ZodType<Prisma.ImpressoraCreateManyArgs> = z.object({
  data: z.union([ ImpressoraCreateManyInputSchema, ImpressoraCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ImpressoraCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ImpressoraCreateManyAndReturnArgs> = z.object({
  data: z.union([ ImpressoraCreateManyInputSchema, ImpressoraCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ImpressoraDeleteArgsSchema: z.ZodType<Prisma.ImpressoraDeleteArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  where: ImpressoraWhereUniqueInputSchema, 
}).strict();

export const ImpressoraUpdateArgsSchema: z.ZodType<Prisma.ImpressoraUpdateArgs> = z.object({
  select: ImpressoraSelectSchema.optional(),
  include: ImpressoraIncludeSchema.optional(),
  data: z.union([ ImpressoraUpdateInputSchema, ImpressoraUncheckedUpdateInputSchema ]),
  where: ImpressoraWhereUniqueInputSchema, 
}).strict();

export const ImpressoraUpdateManyArgsSchema: z.ZodType<Prisma.ImpressoraUpdateManyArgs> = z.object({
  data: z.union([ ImpressoraUpdateManyMutationInputSchema, ImpressoraUncheckedUpdateManyInputSchema ]),
  where: ImpressoraWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressoraUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ImpressoraUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ImpressoraUpdateManyMutationInputSchema, ImpressoraUncheckedUpdateManyInputSchema ]),
  where: ImpressoraWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressoraDeleteManyArgsSchema: z.ZodType<Prisma.ImpressoraDeleteManyArgs> = z.object({
  where: ImpressoraWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressaoCreateArgsSchema: z.ZodType<Prisma.ImpressaoCreateArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  data: z.union([ ImpressaoCreateInputSchema, ImpressaoUncheckedCreateInputSchema ]),
}).strict();

export const ImpressaoUpsertArgsSchema: z.ZodType<Prisma.ImpressaoUpsertArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereUniqueInputSchema, 
  create: z.union([ ImpressaoCreateInputSchema, ImpressaoUncheckedCreateInputSchema ]),
  update: z.union([ ImpressaoUpdateInputSchema, ImpressaoUncheckedUpdateInputSchema ]),
}).strict();

export const ImpressaoCreateManyArgsSchema: z.ZodType<Prisma.ImpressaoCreateManyArgs> = z.object({
  data: z.union([ ImpressaoCreateManyInputSchema, ImpressaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ImpressaoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ImpressaoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ImpressaoCreateManyInputSchema, ImpressaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ImpressaoDeleteArgsSchema: z.ZodType<Prisma.ImpressaoDeleteArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  where: ImpressaoWhereUniqueInputSchema, 
}).strict();

export const ImpressaoUpdateArgsSchema: z.ZodType<Prisma.ImpressaoUpdateArgs> = z.object({
  select: ImpressaoSelectSchema.optional(),
  include: ImpressaoIncludeSchema.optional(),
  data: z.union([ ImpressaoUpdateInputSchema, ImpressaoUncheckedUpdateInputSchema ]),
  where: ImpressaoWhereUniqueInputSchema, 
}).strict();

export const ImpressaoUpdateManyArgsSchema: z.ZodType<Prisma.ImpressaoUpdateManyArgs> = z.object({
  data: z.union([ ImpressaoUpdateManyMutationInputSchema, ImpressaoUncheckedUpdateManyInputSchema ]),
  where: ImpressaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressaoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ImpressaoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ImpressaoUpdateManyMutationInputSchema, ImpressaoUncheckedUpdateManyInputSchema ]),
  where: ImpressaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ImpressaoDeleteManyArgsSchema: z.ZodType<Prisma.ImpressaoDeleteManyArgs> = z.object({
  where: ImpressaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinCreateArgsSchema: z.ZodType<Prisma.CheckinCreateArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  data: z.union([ CheckinCreateInputSchema, CheckinUncheckedCreateInputSchema ]),
}).strict();

export const CheckinUpsertArgsSchema: z.ZodType<Prisma.CheckinUpsertArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereUniqueInputSchema, 
  create: z.union([ CheckinCreateInputSchema, CheckinUncheckedCreateInputSchema ]),
  update: z.union([ CheckinUpdateInputSchema, CheckinUncheckedUpdateInputSchema ]),
}).strict();

export const CheckinCreateManyArgsSchema: z.ZodType<Prisma.CheckinCreateManyArgs> = z.object({
  data: z.union([ CheckinCreateManyInputSchema, CheckinCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CheckinCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckinCreateManyAndReturnArgs> = z.object({
  data: z.union([ CheckinCreateManyInputSchema, CheckinCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CheckinDeleteArgsSchema: z.ZodType<Prisma.CheckinDeleteArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  where: CheckinWhereUniqueInputSchema, 
}).strict();

export const CheckinUpdateArgsSchema: z.ZodType<Prisma.CheckinUpdateArgs> = z.object({
  select: CheckinSelectSchema.optional(),
  include: CheckinIncludeSchema.optional(),
  data: z.union([ CheckinUpdateInputSchema, CheckinUncheckedUpdateInputSchema ]),
  where: CheckinWhereUniqueInputSchema, 
}).strict();

export const CheckinUpdateManyArgsSchema: z.ZodType<Prisma.CheckinUpdateManyArgs> = z.object({
  data: z.union([ CheckinUpdateManyMutationInputSchema, CheckinUncheckedUpdateManyInputSchema ]),
  where: CheckinWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckinUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CheckinUpdateManyMutationInputSchema, CheckinUncheckedUpdateManyInputSchema ]),
  where: CheckinWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinDeleteManyArgsSchema: z.ZodType<Prisma.CheckinDeleteManyArgs> = z.object({
  where: CheckinWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinEventoCreateArgsSchema: z.ZodType<Prisma.CheckinEventoCreateArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  data: z.union([ CheckinEventoCreateInputSchema, CheckinEventoUncheckedCreateInputSchema ]),
}).strict();

export const CheckinEventoUpsertArgsSchema: z.ZodType<Prisma.CheckinEventoUpsertArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereUniqueInputSchema, 
  create: z.union([ CheckinEventoCreateInputSchema, CheckinEventoUncheckedCreateInputSchema ]),
  update: z.union([ CheckinEventoUpdateInputSchema, CheckinEventoUncheckedUpdateInputSchema ]),
}).strict();

export const CheckinEventoCreateManyArgsSchema: z.ZodType<Prisma.CheckinEventoCreateManyArgs> = z.object({
  data: z.union([ CheckinEventoCreateManyInputSchema, CheckinEventoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CheckinEventoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckinEventoCreateManyAndReturnArgs> = z.object({
  data: z.union([ CheckinEventoCreateManyInputSchema, CheckinEventoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CheckinEventoDeleteArgsSchema: z.ZodType<Prisma.CheckinEventoDeleteArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  where: CheckinEventoWhereUniqueInputSchema, 
}).strict();

export const CheckinEventoUpdateArgsSchema: z.ZodType<Prisma.CheckinEventoUpdateArgs> = z.object({
  select: CheckinEventoSelectSchema.optional(),
  include: CheckinEventoIncludeSchema.optional(),
  data: z.union([ CheckinEventoUpdateInputSchema, CheckinEventoUncheckedUpdateInputSchema ]),
  where: CheckinEventoWhereUniqueInputSchema, 
}).strict();

export const CheckinEventoUpdateManyArgsSchema: z.ZodType<Prisma.CheckinEventoUpdateManyArgs> = z.object({
  data: z.union([ CheckinEventoUpdateManyMutationInputSchema, CheckinEventoUncheckedUpdateManyInputSchema ]),
  where: CheckinEventoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinEventoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckinEventoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CheckinEventoUpdateManyMutationInputSchema, CheckinEventoUncheckedUpdateManyInputSchema ]),
  where: CheckinEventoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CheckinEventoDeleteManyArgsSchema: z.ZodType<Prisma.CheckinEventoDeleteManyArgs> = z.object({
  where: CheckinEventoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ServoCreateArgsSchema: z.ZodType<Prisma.ServoCreateArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  data: z.union([ ServoCreateInputSchema, ServoUncheckedCreateInputSchema ]),
}).strict();

export const ServoUpsertArgsSchema: z.ZodType<Prisma.ServoUpsertArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereUniqueInputSchema, 
  create: z.union([ ServoCreateInputSchema, ServoUncheckedCreateInputSchema ]),
  update: z.union([ ServoUpdateInputSchema, ServoUncheckedUpdateInputSchema ]),
}).strict();

export const ServoCreateManyArgsSchema: z.ZodType<Prisma.ServoCreateManyArgs> = z.object({
  data: z.union([ ServoCreateManyInputSchema, ServoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ServoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServoCreateManyInputSchema, ServoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ServoDeleteArgsSchema: z.ZodType<Prisma.ServoDeleteArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  where: ServoWhereUniqueInputSchema, 
}).strict();

export const ServoUpdateArgsSchema: z.ZodType<Prisma.ServoUpdateArgs> = z.object({
  select: ServoSelectSchema.optional(),
  include: ServoIncludeSchema.optional(),
  data: z.union([ ServoUpdateInputSchema, ServoUncheckedUpdateInputSchema ]),
  where: ServoWhereUniqueInputSchema, 
}).strict();

export const ServoUpdateManyArgsSchema: z.ZodType<Prisma.ServoUpdateManyArgs> = z.object({
  data: z.union([ ServoUpdateManyMutationInputSchema, ServoUncheckedUpdateManyInputSchema ]),
  where: ServoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ServoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ServoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ServoUpdateManyMutationInputSchema, ServoUncheckedUpdateManyInputSchema ]),
  where: ServoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ServoDeleteManyArgsSchema: z.ZodType<Prisma.ServoDeleteManyArgs> = z.object({
  where: ServoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificacaoCreateArgsSchema: z.ZodType<Prisma.NotificacaoCreateArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  data: z.union([ NotificacaoCreateInputSchema, NotificacaoUncheckedCreateInputSchema ]),
}).strict();

export const NotificacaoUpsertArgsSchema: z.ZodType<Prisma.NotificacaoUpsertArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereUniqueInputSchema, 
  create: z.union([ NotificacaoCreateInputSchema, NotificacaoUncheckedCreateInputSchema ]),
  update: z.union([ NotificacaoUpdateInputSchema, NotificacaoUncheckedUpdateInputSchema ]),
}).strict();

export const NotificacaoCreateManyArgsSchema: z.ZodType<Prisma.NotificacaoCreateManyArgs> = z.object({
  data: z.union([ NotificacaoCreateManyInputSchema, NotificacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const NotificacaoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificacaoCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificacaoCreateManyInputSchema, NotificacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const NotificacaoDeleteArgsSchema: z.ZodType<Prisma.NotificacaoDeleteArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  where: NotificacaoWhereUniqueInputSchema, 
}).strict();

export const NotificacaoUpdateArgsSchema: z.ZodType<Prisma.NotificacaoUpdateArgs> = z.object({
  select: NotificacaoSelectSchema.optional(),
  include: NotificacaoIncludeSchema.optional(),
  data: z.union([ NotificacaoUpdateInputSchema, NotificacaoUncheckedUpdateInputSchema ]),
  where: NotificacaoWhereUniqueInputSchema, 
}).strict();

export const NotificacaoUpdateManyArgsSchema: z.ZodType<Prisma.NotificacaoUpdateManyArgs> = z.object({
  data: z.union([ NotificacaoUpdateManyMutationInputSchema, NotificacaoUncheckedUpdateManyInputSchema ]),
  where: NotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificacaoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificacaoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NotificacaoUpdateManyMutationInputSchema, NotificacaoUncheckedUpdateManyInputSchema ]),
  where: NotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const NotificacaoDeleteManyArgsSchema: z.ZodType<Prisma.NotificacaoDeleteManyArgs> = z.object({
  where: NotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UsuarioNotificacaoCreateArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  data: z.union([ UsuarioNotificacaoCreateInputSchema, UsuarioNotificacaoUncheckedCreateInputSchema ]),
}).strict();

export const UsuarioNotificacaoUpsertArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoUpsertArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereUniqueInputSchema, 
  create: z.union([ UsuarioNotificacaoCreateInputSchema, UsuarioNotificacaoUncheckedCreateInputSchema ]),
  update: z.union([ UsuarioNotificacaoUpdateInputSchema, UsuarioNotificacaoUncheckedUpdateInputSchema ]),
}).strict();

export const UsuarioNotificacaoCreateManyArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyArgs> = z.object({
  data: z.union([ UsuarioNotificacaoCreateManyInputSchema, UsuarioNotificacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UsuarioNotificacaoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoCreateManyAndReturnArgs> = z.object({
  data: z.union([ UsuarioNotificacaoCreateManyInputSchema, UsuarioNotificacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UsuarioNotificacaoDeleteArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoDeleteArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  where: UsuarioNotificacaoWhereUniqueInputSchema, 
}).strict();

export const UsuarioNotificacaoUpdateArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateArgs> = z.object({
  select: UsuarioNotificacaoSelectSchema.optional(),
  include: UsuarioNotificacaoIncludeSchema.optional(),
  data: z.union([ UsuarioNotificacaoUpdateInputSchema, UsuarioNotificacaoUncheckedUpdateInputSchema ]),
  where: UsuarioNotificacaoWhereUniqueInputSchema, 
}).strict();

export const UsuarioNotificacaoUpdateManyArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyArgs> = z.object({
  data: z.union([ UsuarioNotificacaoUpdateManyMutationInputSchema, UsuarioNotificacaoUncheckedUpdateManyInputSchema ]),
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UsuarioNotificacaoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UsuarioNotificacaoUpdateManyMutationInputSchema, UsuarioNotificacaoUncheckedUpdateManyInputSchema ]),
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UsuarioNotificacaoDeleteManyArgsSchema: z.ZodType<Prisma.UsuarioNotificacaoDeleteManyArgs> = z.object({
  where: UsuarioNotificacaoWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();