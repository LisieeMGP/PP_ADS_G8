# Script de Teste - TST-007: Consulta de encomendas cadastradas

## 1. Identificação

* Identificação única: TST-007
* Caso de teste relacionado: TC-005 Consulta de encomendas
* Caso de uso: UC-004 - Consultar encomendas
* Cenário: Fluxo principal

## 2. Preparação

### Estado atual do banco de dados antes da execução

* Usuário autenticado no sistema.
* Moradores existentes:
  * `Joao da Silva` / bloco `A` / unidade `101`
  * `Maria Oliveira` / bloco `B` / unidade `204`
* Encomendas existentes:
  * `BR123456789` para `Joao da Silva` em `A-101` com status `AGUARDANDO_RETIRADA`
  * `BR987654321` para `Maria Oliveira` em `B-204` com status `RETIRADA`

### Estado esperado após a execução do caso

* A listagem de encomendas deve ser apresentada.
* As encomendas cadastradas devem permanecer inalteradas.
* A situação atual de cada encomenda deve ser exibida corretamente.
* Nenhum dado deve ser alterado no banco em razão da consulta.

## 3. Passos para execução

1. Acessar a aplicação.
2. Realizar login com um usuário válido.
3. Acessar a funcionalidade `Consultar encomendas`.
4. Visualizar a listagem apresentada pelo sistema.
5. Localizar as encomendas `BR123456789` e `BR987654321`.

## 4. Resultado esperado

* A encomenda `BR123456789` deve ser apresentada associada a `Joao da Silva` com status `AGUARDANDO_RETIRADA`.
* A encomenda `BR987654321` deve ser apresentada associada a `Maria Oliveira` com status `RETIRADA`.

## 5. Resultado obtido

* [ ] Sucesso
* [ ] Não Executado
* [ ] Falha
* [ ] Cancelado

### Descrição do resultado obtido

* .

### Data da última execução

* __/__/____
