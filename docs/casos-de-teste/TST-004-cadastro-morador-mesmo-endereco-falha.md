# Script de Teste - TST-004: Cadastro de segundo morador no mesmo endereço (falha)

## 1. Identificação

- Identificação única: TST-004
- Caso de teste relacionado: TC-002 Cadastro de moradores
- Caso de uso: UC-002 - Cadastrar morador
- Cenário: Fluxo alternativo com falha de regra de negócio / integridade

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Moradores já cadastrados:
    - `Joao da Silva` / bloco `A` / unidade `101`
    - `Maria Oliveira` / bloco `B` / unidade `204`
    - `Carlos Mendes` / bloco `A` / unidade `302`
- Já existe um morador no endereço `bloco A / unidade 101`.
- A regra no banco define `UNIQUE (bloco, unidade)` na tabela `moradores`.

### Estado esperado após a execução do caso

- O cadastro do segundo morador no mesmo endereço deve ser bloqueado.
- O banco deve permanecer inalterado.
- Não deve existir uma segunda linha com o mesmo `bloco` e `unidade`.
- O sistema deve informar que o endereço já está ocupado por outro morador.

## 3. Passos para execução

1. Acessar a funcionalidade de cadastro de moradores.
2. Informar nome: `Pedro Santos`.
3. Informar bloco: `A`.
4. Informar unidade: `101`.
5. Clicar em salvar.

## 4. Resultado esperado

- O sistema deve impedir o cadastro do morador duplicado.
- Deve apresentar erro de validação ou mensagem de falha de integridade.
- O banco deve continuar com o mesmo número de registros e sem duplicação de endereço.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_

## 6. Observação do cenário de falha

Este caso reproduz a situação atual do sistema em que o banco possui a restrição `UNIQUE (bloco, unidade)`. Como consequência, a tentativa de cadastrar um segundo morador no mesmo endereço gera erro de integridade em vez de uma mensagem de negócio amigável. Este teste deve registrar exatamente esse comportamento para futura correção da regra.
