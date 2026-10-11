# Script de Teste - TST-006: Retirada de encomenda com sucesso

## 1. Identificação

- Identificação única: TST-006
- Caso de teste relacionado: TC-004 Retirada de encomendas
- Caso de uso: UC-005 - Registrar retirada de encomenda
- Cenário: Fluxo principal

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Encomenda cadastrada e pendente:
    - Código `BR111222333`
    - Status atual: `AGUARDANDO_RETIRADA`
    - Morador associado: `Joao da Silva` / bloco `A` / unidade `101`
- Usuário autenticado no sistema.

### Estado esperado após a execução do caso

- O status da encomenda deve ser alterado para `RETIRADA`.
- A data de retirada deve ser registrada.
- O usuário responsável pela retirada deve ser gravado no banco.
- A encomenda não deve continuar no estado pendente.

## 3. Passos para execução

1. Acessar a funcionalidade de retirada de encomendas.
2. Selecionar a encomenda pendente `BR111222333`.
3. Confirmar a retirada.

## 4. Resultado esperado

- O sistema deve atualizar o status da encomenda para `RETIRADA`.
- Deve registrar o responsável pela retirada.
- A encomenda deve deixar de constar como pendente na listagem.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_
