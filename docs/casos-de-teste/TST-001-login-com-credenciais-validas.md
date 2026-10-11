# Script de Teste - TST-001: Login com credenciais válidas

## 1. Identificação

- Identificação única: TST-001
- Caso de teste relacionado: TC-001 Autenticação do sistema
- Caso de uso: UC-001 - Realizar login
- Cenário: Fluxo principal

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Usuários existentes:
    - `john@example.com` / senha válida (`changeme`), com nome `Joao da Silva`
    - `maria@example.com` / senha válida, com nome `Maria Oliveira`
- Moradores existentes:
    - `Joao da Silva` / bloco `A` / unidade `101`
    - `Maria Oliveira` / bloco `B` / unidade `204`
    - `Carlos Mendes` / bloco `A` / unidade `302`
- Encomendas existentes:
    - `BR123456789` para `Joao da Silva` em `A-101` com status `AGUARDANDO_RETIRADA`
    - `BR987654321` para `Maria Oliveira` em `B-204` com status `RETIRADA`

### Estado esperado após a execução do caso

- O usuário deve permanecer cadastrado no banco.
- O sistema deve autenticar o login corretamente.
- A aplicação deve redirecionar para a página inicial do sistema.
- Nenhum registro novo deve ser criado no banco como resultado deste teste.

## 3. Passos para execução

1. Acessar a tela de login da aplicação.
2. Informar o e-mail `john@example.com`.
3. Informar a senha `changeme`.
4. Clicar no botão de login.

## 4. Resultado esperado

- O sistema deve autenticar o usuário com sucesso.
- A aplicação deve redirecionar para a página inicial.
- O usuário deve ter acesso às funcionalidades protegidas da aplicação.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

- .

### Data da última execução

- **/**/\_\_\_\_
