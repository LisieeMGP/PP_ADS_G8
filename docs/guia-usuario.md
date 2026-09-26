# Guia do Usuário - Sistema de Encomendas

## 1. Acesso à aplicação

A aplicação está disponível em:

- Frontend: https://pp-ads-g8.onrender.com
- API: https://encomendas-api.onrender.com

Para acessar, abra o endereço do frontend em um navegador web moderno.

> A API também pode ser acessada diretamente para testes e validação técnica.

## 2. Login

Utilize as credenciais de acesso padrão para testar o sistema:

- E-mail: `john@example.com`
- Senha: `changeme`

Ao autenticar com sucesso, o sistema redireciona o usuário para a área inicial da aplicação.

## 3. Funcionalidades disponíveis

### 3.1 Página inicial

A página inicial apresenta a visão geral do sistema e permite que o usuário navegue para as principais áreas do sistema.

### 3.2 Cadastro de moradores

Acesse a funcionalidade de moradores para registrar novos residentes do condomínio.

Campos normalmente esperados:

- Nome do morador
- Bloco
- Unidade

Após salvar, o morador fica disponível para associação com encomendas.

### 3.3 Registro de encomendas

Acesse a área de encomendas para registrar uma nova entrega.

Informe:

- Morador destinatário
- Descrição da encomenda
- Código de rastreio, quando houver

A encomenda é registrada com status inicial de `AGUARDANDO_RETIRADA`.

### 3.4 Consulta de encomendas

A funcionalidade de consulta permite visualizar todas as encomendas registradas, com filtros e buscas por:

- nome do morador
- unidade
- código de rastreio
- status

### 3.5 Retirada de encomendas

Na área de retirada, é possível marcar uma encomenda como entregue/retirada.

Ao confirmar a retirada:

- o status muda para `RETIRADA`
- a data de retirada é registrada
- o usuário responsável pela retirada é armazenado

## 4. Fluxo típico de uso

1. Faça login na aplicação.
2. Cadastre ou confirme o morador.
3. Registre a encomenda.
4. Consulte o registro para confirmar que a entrega foi cadastrada.
5. Quando a encomenda for entregue ao morador, registre a retirada.
6. Verifique no banco de dados que os dados foram persistidos corretamente.

## 5. Observações técnicas

- O sistema usa autenticação por JWT.
- Os dados são persistidos em banco PostgreSQL.
- Se a aplicação estiver em ambiente local, o backend e o banco podem ser executados via Docker Compose.
- O frontend e a API estão estruturados separadamente, com a API responsável pela regra de negócio e o frontend por interação com o usuário.

## 6. Suporte e validação

Para verificar se o sistema está funcionando corretamente, teste os seguintes cenários:

- Login com usuário válido
- Login com senha incorreta
- Cadastro de um morador novo
- Cadastro de encomenda para esse morador
- Consulta da encomenda cadastrada
- Retirada da encomenda
- Confirmação de persistência no banco

## 7. Problemas comuns

### 7.1 Erro de autenticação

Verifique:

- usuário informado está correto
- senha digitada está correta
- backend está disponível

### 7.2 Erro no cadastro

Verifique:

- morador informado não tem dados incompletos
- unidade ou bloco estão preenchidos corretamente
- a API e o banco estão acessíveis

### 7.3 Encomenda não aparece na consulta

Verifique:

- a encomenda foi registrada com sucesso
- a API respondeu corretamente
- o banco possui o registro

## 8. Contato / manutenção

Este guia é destinado ao uso do sistema e à validação da entrega da Aula 3. Para futuras melhorias, o projeto deve continuar sendo evoluído com testes e acompanhamento de tarefas no quadro do GitHub.
