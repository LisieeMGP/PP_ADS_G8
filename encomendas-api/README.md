# Encomendas API

API REST do sistema de gerenciamento de encomendas, construída com NestJS 12, TypeScript, PostgreSQL, TypeORM e JWT.

## Requisitos

- Node.js 22 ou superior
- npm
- PostgreSQL local ou uma `DATABASE_URL`

## Instalação e execução

```bash
npm install
npm run start:dev
```

A API escuta `http://localhost:3001` por padrão. O Swagger está disponível em `http://localhost:3001/api`.

Para executar a stack completa, use os comandos na raiz do repositório:

```bash
docker compose up -d --build
docker compose logs -f encomendas-api
```

## Variáveis de ambiente

Em desenvolvimento, crie `encomendas-api/.env`. No Render, cadastre as variáveis diretamente no painel do serviço, pois o Render não carrega automaticamente o arquivo `.env` do repositório.

```text
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:5432/banco
JWT_SECRET=um-segredo-longo-e-aleatorio
CORS_ORIGINS=http://localhost:4200
```

Também são aceitas as variáveis separadas `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD` quando `DATABASE_URL` não for usada. Para PostgreSQL com SSL, defina `DB_SSL=true`.

## Banco de dados

O acesso ao PostgreSQL usa o `DataSource` do TypeORM. As consultas atuais continuam em SQL parametrizado e `synchronize` está desativado. O schema e os dados iniciais são criados por `database/init.sql` quando o volume do PostgreSQL é inicializado pela primeira vez.

O login usa o e-mail do usuário como `username`:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"john@example.com","password":"changeme"}'
```

## Observabilidade

O módulo `src/observe.module.ts` integra `@nestjs/observe` para telemetria de requisições HTTP, runtime, providers NestJS e chamadas HTTP de saída. O usuário autenticado é identificado pelo `sub` do JWT; requisições sem autenticação usam `anonymous`.

Configure as credenciais quando o Observe for utilizado:

```text
OBSERVE_APP_KEY=<chave da aplicação>
OBSERVE_APP_SECRET=<segredo da aplicação>
OBSERVE_SERVICE_ID=encomendas-api
OBSERVE_SERVICE_VERSION=1.0.0
OBSERVE_ENDPOINT=https://observe-api.nestjs.com
OBSERVE_DATABASE=false
OBSERVE_DEBUG=false
```

`OBSERVE_DATABASE` deve permanecer `false` nesta versão. A instrumentação de banco do Observe apresentou incompatibilidade em execução com o acesso PostgreSQL; o acesso da aplicação continua sendo feito pelo TypeORM. `OBSERVE_DEBUG=true` habilita logs de diagnóstico.

Nunca versione `OBSERVE_APP_KEY`, `OBSERVE_APP_SECRET`, `DATABASE_URL` ou `JWT_SECRET`. No Render, configure esses valores como variáveis do serviço.

## Scripts

```bash
npm run build       # compila a API
npm run start:dev   # desenvolvimento com watch
npm run start:prod  # executa dist/main.js
npm test            # testes unitários
npm run test:e2e    # testes end-to-end
npm run test:cov    # cobertura
npm run lint        # análise estática
```

## Deploy no Render

Crie um Web Service apontando para o diretório `encomendas-api` e configure:

- Build Command: `npm install && npm run build`
- Start Command: `npm run start:prod`
- Health Check Path: `/`

Cadastre `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` e `OBSERVE_DATABASE=false` no painel Environment. Use em `CORS_ORIGINS` a URL pública do frontend, sem barra final.
