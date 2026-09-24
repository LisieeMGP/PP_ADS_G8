# Projeto de Prática Profissional em ADS

Aplicação web para gerenciamento de encomendas em condomínio, desenvolvida pelo Grupo 8. O projeto é composto por um frontend Angular, uma API REST em NestJS e um banco PostgreSQL.

## Estrutura do projeto

```text
.
├── database/             # Dockerfile e script de criação/carga do PostgreSQL
├── encomendas/            # Frontend Angular 22
│   └── src/app/
│       ├── core/auth/     # Autenticação, guard e interceptor
│       └── features/      # Login, dashboard, moradores e encomendas
├── encomendas-api/        # API NestJS 12
│   └── src/
│       ├── auth/          # Login JWT e proteção de rotas
│       ├── deliveries/    # Registro, consulta e retirada de encomendas
│       ├── residents/     # Cadastro e consulta de moradores
│       ├── users/         # Usuários da aplicação
│       └── database/      # Pool de conexão PostgreSQL
└── docker-compose.yml     # Orquestra frontend, API e PostgreSQL
```

O diretório `front/encomendas` contém uma cópia do frontend. A execução documentada neste arquivo usa a versão em `encomendas/`, que é a referenciada pelo `docker-compose.yml`.

## Pré-requisitos

Para executar a stack completa, instale:

- Podman e `podman-compose`.
- Node.js 22 ou superior e npm, caso execute os projetos fora dos containers.

Todos os comandos abaixo partem da raiz do repositório.

## Primeira execução após clonar

Este é o caminho mais direto para começar usando os containers:

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd PP_ADS_G8
```

2. Confirme que Podman e `podman-compose` estão instalados:

```bash
podman --version
podman-compose --version
```

3. Na raiz do projeto, construa as imagens e suba o frontend, a API e o PostgreSQL:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose up -d --build
```

4. Confira se os três serviços estão em execução:

```bash
podman compose ps
```

5. Abra http://localhost:4200 no navegador. Entre com `john` e `changeme` ou use a documentação interativa em http://localhost:3001/api.

6. Para confirmar rapidamente que a API está respondendo:

```bash
curl http://localhost:3001/
```

Na primeira execução, a construção pode levar alguns minutos e o PostgreSQL precisa concluir o healthcheck antes de a API iniciar. Se algum serviço não subir, consulte os logs com `PODMAN_COMPOSE_PROVIDER=podman-compose podman compose logs -f`. As portas `4200`, `3001` e `5432` precisam estar livres.

## Executar com Podman

O Compose cria os seguintes serviços:

| Serviço          | Container             | Endereço local        |
| ---------------- | --------------------- | --------------------- |
| Frontend Angular | `encomendas`          | http://localhost:4200 |
| API NestJS       | `encomendas-api`      | http://localhost:3001 |
| PostgreSQL 16    | `encomendas-postgres` | `localhost:5432`      |

Construa as imagens e suba os serviços:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose up -d --build
```

O banco executa `database/init.sql` automaticamente na primeira inicialização do volume. O script cria as tabelas de usuários, moradores e encomendas e insere dados de exemplo.

Verifique os containers e acompanhe os logs:

```bash
podman ps
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose logs -f
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose logs -f encomendas-api
```

Acesse o frontend em http://localhost:4200 e o Swagger da API em http://localhost:3001/api.

Para parar a stack mantendo os dados do banco:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose down
```

Para parar a stack e remover também o volume do PostgreSQL:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose down -v
```

## Configuração do banco

Os valores usados pelo Compose são:

```text
Banco:       encomendas_db
Usuário:     encomendas
Senha:       encomendas
Host local:  localhost
Host Compose: postgres
Porta:       5432
```

Ao executar a API diretamente no host, ela usa `localhost:5432` por padrão. As variáveis aceitas pela API são `DATABASE_URL` ou, separadamente, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`. Também é possível configurar `DB_POOL_MAX`, `DB_IDLE_TIMEOUT_MS`, `DB_CONNECTION_TIMEOUT_MS` e `DB_SSL=true`.

## Executar os projetos individualmente

### Frontend

```bash
cd encomendas
npm install
npm start
```

O frontend estará disponível em http://localhost:4200 e consumirá a API em http://localhost:3001. Para gerar o build de produção:

```bash
npm run build
```

Rotas principais da aplicação:

- `/login`: autenticação.
- `/inicio`: visão geral.
- `/moradores`: cadastro de moradores.
- `/encomendas/registrar`: registro de encomendas.
- `/encomendas/consultar`: consulta de encomendas.
- `/encomendas/retirada`: registro de retirada.

### API

Com o PostgreSQL em execução, instale as dependências e inicie a API:

```bash
cd encomendas-api
npm install
npm run start:dev
```

A API escuta a porta `3001` por padrão no código; use `PORT` para alterá-la:

```bash
PORT=3000 npm run start:dev
```

Para produção local:

```bash
npm run build
npm run start:prod
```

O login público de teste é:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"john","password":"changeme"}'
```

As demais rotas exigem o token JWT retornado em `access_token`.

### PostgreSQL em container separado

Para executar somente o banco sem a stack completa:

```bash
podman build -t localhost/encomendas-postgres:local ./database
podman volume create postgres-data
podman run -d \
  --name encomendas-postgres-local \
  -e POSTGRES_DB=encomendas_db \
  -e POSTGRES_USER=encomendas \
  -e POSTGRES_PASSWORD=encomendas \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  localhost/encomendas-postgres:local
```

O arquivo `init.sql` só é executado quando o volume está vazio. Para recriar os dados iniciais:

```bash
podman rm -f encomendas-postgres-local
podman volume rm postgres-data
```

## Observabilidade

A API usa `@nestjs/observe` para coletar telemetria da aplicação NestJS. A integração está organizada em três pontos:

- `encomendas-api/src/observe.module.ts` chama `createObserveModule()` e exporta `ObserveInstrument` e `observeModule`.
- `encomendas-api/src/app.module.ts` importa `observeModule` junto dos módulos de autenticação, usuários, moradores, encomendas e banco.
- `encomendas-api/src/main.ts` passa `ObserveInstrument` para `NestFactory.create()`, ativando a instrumentação durante o bootstrap da API.

Com essa configuração, a estrutura disponível monitora:

- requisições e respostas HTTP da API;
- runtime e providers do NestJS;
- chamadas HTTP de saída;
- conexões e consultas realizadas pelo pool `pg` do PostgreSQL;
- associação da requisição a um usuário: depois do login, o identificador JWT `sub` é usado como `userId`; requisições sem usuário ficam como `anonymous`.

O rastreamento do banco e de chamadas HTTP de saída é habilitado por padrão. A instrumentação do banco pode ser desativada com `OBSERVE_DATABASE=false`. O contexto de origem pode ser desativado com `OBSERVE_SOURCE_CONTEXT=false`.

Para uma execução local, crie `encomendas-api/.env` e informe as credenciais e a identificação do serviço:

```bash
OBSERVE_APP_KEY=your-app-key
OBSERVE_APP_SECRET=your-app-secret
OBSERVE_SERVICE_ID=encomendas-api
OBSERVE_SERVICE_VERSION=1.0.0
OBSERVE_ENDPOINT=https://observe-api.nestjs.com
OBSERVE_DATABASE=true
OBSERVE_DEBUG=false
```

`OBSERVE_DEBUG=true` habilita logs de diagnóstico do SDK. Não committe esse arquivo nem exponha `OBSERVE_APP_KEY` e `OBSERVE_APP_SECRET`.

Ao executar via `docker-compose.yml`, as variáveis de observabilidade precisam ser repassadas ao serviço `encomendas-api` no Compose para que os containers usem uma conta Observe. Sem essas variáveis, a aplicação mantém os valores padrão definidos em `observe.module.ts`; isso não substitui a configuração de credenciais necessária para enviar dados a uma conta Observe.

## Testes e qualidade

Na API:

```bash
cd encomendas-api
npm test
npm run test:e2e
npm run test:cov
npm run lint
```

No frontend:

```bash
cd encomendas
npm test
```
