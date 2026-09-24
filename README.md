# Projeto de Prática Profissional em ADS

Aplicação de gerenciamento de encomendas do Grupo 8. O repositório contém:

- `encomendas`: frontend em Angular.
- `encomendas-api`: API REST em NestJS.
- MySQL: banco de dados usado pelo ambiente de desenvolvimento.

## Pré-requisitos

Para executar com containers, instale:

- Podman.
- `podman-compose`.

O comando `podman compose` pode selecionar o `docker-compose` do sistema. Neste projeto, force o provedor Podman com a variável `PODMAN_COMPOSE_PROVIDER=podman-compose`.

Para executar as aplicações diretamente no Linux, instale também:

- Node.js 22 ou superior.
- npm.
- MySQL 8.4 ou superior, caso o banco também seja executado fora do container.

Todos os comandos desta documentação devem ser executados na raiz do repositório, na pasta que contém este arquivo e o `docker-compose.yml`.

## Executar as três aplicações com Podman

O Compose cria três containers:

| Serviço          | Container          | Endereço local        |
| ---------------- | ------------------ | --------------------- |
| Frontend Angular | `encomendas`       | http://localhost:4200 |
| API NestJS       | `encomendas-api`   | http://localhost:3001 |
| MySQL            | `encomendas-mysql` | localhost:3306        |

Suba os containers e construa as imagens:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose up -d --build
```

O MySQL executa automaticamente o arquivo `database/init.sql`, incorporado em `database/Dockerfile`, na primeira inicialização do volume. Esse arquivo cria as tabelas e insere os dados de exemplo.

Confira o estado dos serviços:

```bash
podman ps
```

Veja os logs de todos os serviços ou de um serviço específico:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose logs -f
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose logs -f encomendas-api
```

Abra o frontend em http://localhost:4200. A documentação Swagger da API está disponível em http://localhost:3001/api.

Para parar os containers sem remover o volume do banco:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose down
```

Para parar os containers e apagar também os dados persistidos do MySQL:

```bash
PODMAN_COMPOSE_PROVIDER=podman-compose podman compose down -v
```

As credenciais padrão do banco são:

```text
Database: encomendas_db
Usuário:  encomendas
Senha:    encomendas
Root:     root
Host:     mysql (dentro da rede Compose) ou localhost (na máquina)
Porta:    3306
```

## Executar o frontend individualmente

Instale as dependências e inicie o servidor Angular em modo de desenvolvimento:

```bash
cd encomendas
npm install
npm start
```

Acesse http://localhost:4200. O servidor recarrega automaticamente quando os arquivos do frontend são alterados.

Para gerar apenas o build de produção:

```bash
npm run build
```

## Executar a API individualmente

Instale as dependências e inicie a API NestJS em modo de desenvolvimento:

```bash
cd encomendas-api
npm install
npm run start:dev
```

A API será iniciada na porta `3000` por padrão. Acesse a documentação Swagger em http://localhost:3000/api.

Para iniciar em modo de produção local:

```bash
npm run build
npm run start:prod
```

Para usar outra porta:

```bash
PORT=3001 npm run start:dev
```

O login público de teste usa um dos usuários definidos atualmente pela API:

```bash
curl -X POST http://localhost:3000/auth/login \
	-H 'Content-Type: application/json' \
	-d '{"username":"john","password":"changeme"}'
```

## Executar o MySQL individualmente

### Usando MySQL instalado no Linux

Inicie o serviço do MySQL:

```bash
sudo systemctl start mysql
```

Crie o banco e o usuário de testes:

```bash
sudo mysql <<'SQL'
CREATE DATABASE IF NOT EXISTS encomendas_db;
CREATE USER IF NOT EXISTS 'encomendas'@'localhost' IDENTIFIED BY 'encomendas';
GRANT ALL PRIVILEGES ON encomendas_db.* TO 'encomendas'@'localhost';
FLUSH PRIVILEGES;
SQL
```

Carregue o schema e os dados iniciais:

```bash
mysql -u encomendas -pencomendas encomendas_db < database/init.sql
```

### Usando somente o container do MySQL

Caso não queira instalar o MySQL no sistema, construa e execute a imagem definida em `database/Dockerfile`:

```bash
podman build -t localhost/encomendas-mysql:local ./database
podman volume create encomendas-mysql-data
podman run -d \
	--name encomendas-mysql-local \
	-e MYSQL_DATABASE=encomendas_db \
	-e MYSQL_USER=encomendas \
	-e MYSQL_PASSWORD=encomendas \
	-e MYSQL_ROOT_PASSWORD=root \
	-p 3307:3306 \
	-v encomendas-mysql-data:/var/lib/mysql \
	localhost/encomendas-mysql:local
```

Nesse exemplo, o MySQL fica disponível na porta `3307` da máquina e na porta `3306` dentro do container. A porta `3307` evita conflito caso a stack Compose ou uma instalação local do MySQL esteja usando a porta padrão. Para usar a porta padrão, troque `-p 3307:3306` por `-p 3306:3306`.

O arquivo `init.sql` é executado somente quando o volume `encomendas-mysql-data` ainda está vazio. Para recriar o banco e executar a carga inicial novamente:

```bash
podman rm -f encomendas-mysql-local
podman volume rm encomendas-mysql-data
podman volume create encomendas-mysql-data
```

Depois, execute novamente o comando `podman run` acima.

Verifique o banco:

```bash
podman exec encomendas-mysql-local \
	mysql -uencomendas -pencomendas -D encomendas_db \
	-e 'SELECT COUNT(*) AS total FROM encomendas;'
```

Para remover esse container de teste:

```bash
podman rm -f encomendas-mysql-local
podman volume rm encomendas-mysql-data
```

## Testes

Na API:

```bash
cd encomendas-api
npm test
npm run test:e2e
```

No frontend:

```bash
cd encomendas
npm test
```
