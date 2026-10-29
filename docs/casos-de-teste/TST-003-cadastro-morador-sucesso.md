# Script de Teste - TST-003: Cadastro de morador com sucesso

## 1. Identificação

- Identificação única: TST-003
- Caso de teste relacionado: TC-002 Cadastro de moradores
- Caso de uso: UC-002 - Cadastrar morador
- Cenário: Fluxo principal

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Moradores já cadastrados:
    - `Joao da Silva` / bloco `A` / unidade `101`
    - `Maria Oliveira` / bloco `B` / unidade `204`
    - `Carlos Mendes` / bloco `A` / unidade `302`
- Não existe nenhum morador com os dados do novo cadastro a seguir.

### Estado esperado após a execução do caso

- O banco deve conter um novo registro de morador com os dados informados.
- O cadastro deve ser persistido na tabela `moradores`.
- O conjunto de moradores deve aumentar em 1 registro.

## 3. Passos para execução

1. Acessar a funcionalidade de cadastro de moradores.
2. Informar nome: `Ana Pereira`.
3. Informar bloco: `C`.
4. Informar unidade: `305`.
5. Clicar em salvar.

## 4. Resultado esperado

- O sistema deve criar o morador com sucesso.
- Deve exibir mensagem de confirmação de cadastro.
- Após a confirmação, o formulário deve ser limpo.
- O novo morador deve ficar disponível para associação com encomendas.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_
