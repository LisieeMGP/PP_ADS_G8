# Script de Teste - TST-002: Login com senha inválida

## 1. Identificação

- Identificação única: TST-002
- Caso de teste relacionado: TC-001 Autenticação do sistema
- Caso de uso: UC-001 - Realizar login
- Cenário: Fluxo alternativo

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Usuário cadastrado:
    - `john@example.com` / nome `Joao da Silva`
- Senha correta no banco: `changeme`
- Nenhuma alteração persistente no sistema deve ocorrer antes da execução.

### Estado esperado após a execução do caso

- O usuário não deve ser autenticado.
- O acesso deve ser negado.
- Nenhuma sessão de usuário deve ser criada.
- Nenhum dado deve ser alterado no banco.

## 3. Passos para execução

1. Acessar a tela de login.
2. Informar o e-mail `john@example.com`.
3. Informar uma senha incorreta, por exemplo: `senhaerrada`.
4. Clicar no botão de login.

## 4. Resultado esperado

- O sistema deve rejeitar a autenticação.
- Deve exibir mensagem de erro informando credenciais inválidas.
- O usuário deve permanecer na tela de login.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_
