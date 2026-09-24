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

O diretório `front/encomendas` contém uma cópia do frontend. A execução documentada neste arquivo usa a versão em `encomendas/`, referenciada pelo `docker-compose.yml`.

## Pré-requisitos

Para executar a stack completa, instale o Docker Engine e o Docker Compose. O daemon do Docker deve estar em execução.

Caso execute os projetos fora dos containers, instale também Node.js 22 ou superior e npm.

Todos os comandos abaixo partem da raiz do repositório.

## Primeira execução após clonar

1. Clone o repositório e entre na pasta do projeto:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd PP_ADS_G8
    ```

2. Confirme que Docker e Docker Compose estão instalados:

    ```bash
    docker --version
    docker compose version
    ```

3. Construa as imagens e suba o frontend, a API e o PostgreSQL:

    ```bash
    docker compose up -d --build
    ```

4. Confira os serviços:

    ```bash
    docker compose ps
    ```

5. Abra http://localhost:4200. Use `john` e `changeme` para o primeiro login.

6. Confirme que a API responde:

    ```bash
    curl http://localhost:3001/
    ```

Na primeira execução, a construção pode levar alguns minutos e o PostgreSQL precisa concluir o healthcheck antes de a API iniciar. Se algum serviço não subir, consulte `docker compose logs -f`. As portas `4200`, `3001` e `5432` precisam estar livres.

## Executar com Docker

O Compose cria os seguintes serviços:

| Serviço          | Container             | Endereço local        |
| ---------------- | --------------------- | --------------------- |
| Frontend Angular | `encomendas`          | http://localhost:4200 |
| API NestJS       | `encomendas-api`      | http://localhost:3001 |
| PostgreSQL 16    | `encomendas-postgres` | `localhost:5432`      |

O banco executa `database/init.sql` automaticamente na primeira inicialização do volume. O script cria as tabelas e insere dados de exemplo.

Verifique os containers e acompanhe os logs:

```bash
docker ps
docker compose logs -f
docker compose logs -f encomendas-api
```

Acesse o Swagger da API em http://localhost:3001/api.

Para parar a stack mantendo os dados do banco:

```bash
docker compose down
```

Para parar a stack e remover também o volume do PostgreSQL:

```bash
docker compose down -v
```

## Configuração do banco

```text
Banco:        encomendas_db
Usuário:      encomendas
Senha:        encomendas
Host local:   localhost
Host Compose: postgres
Porta:        5432
```

Ao executar a API diretamente no host, ela usa `localhost:5432` por padrão. As variáveis aceitas são `DATABASE_URL` ou, separadamente, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`.

## Executar os projetos individualmente

### Frontend

```bash
cd encomendas
npm install
npm start
```

O frontend estará disponível em http://localhost:4200. Para gerar o build de produção:

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

Com o PostgreSQL em execução:

```bash
cd encomendas-api
npm install
npm run start:dev
```

A API escuta a porta `3001` por padrão. Use `PORT` para alterá-la:

```bash
PORT=3000 npm run start:dev
```

Para produção local:

```bash
npm run build
npm run start:prod
```

Login de teste:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"john","password":"changeme"}'
```

### PostgreSQL em container separado

```bash
docker build -t localhost/encomendas-postgres:local ./database
docker volume create postgres-data
docker run -d \
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
docker rm -f encomendas-postgres-local
docker volume rm postgres-data
```

## Observabilidade

A API usa `@nestjs/observe` para coletar telemetria. `observe.module.ts` cria o módulo e o instrumentador, `app.module.ts` importa o módulo e `main.ts` passa `ObserveInstrument` para o bootstrap do NestJS.

A instrumentação monitora requisições HTTP, runtime e providers do NestJS, chamadas HTTP de saída e o pool PostgreSQL. Após o login, o identificador `sub` do JWT é usado como `userId`; requisições sem usuário ficam como `anonymous`.

O banco e chamadas HTTP de saída são rastreados por padrão. Use `OBSERVE_DATABASE=false` para desativar o rastreamento do banco e `OBSERVE_SOURCE_CONTEXT=false` para desativar o contexto de origem.

Para execução local, configure `encomendas-api/.env`:

```bash
OBSERVE_APP_KEY=your-app-key
OBSERVE_APP_SECRET=your-app-secret
OBSERVE_SERVICE_ID=encomendas-api
OBSERVE_SERVICE_VERSION=1.0.0
OBSERVE_ENDPOINT=https://observe-api.nestjs.com
OBSERVE_DATABASE=true
OBSERVE_DEBUG=false
```

`OBSERVE_DEBUG=true` habilita logs de diagnóstico. Nunca versione ou exponha `OBSERVE_APP_KEY` e `OBSERVE_APP_SECRET`. No Render, configure essas variáveis como secrets do serviço da API.

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
