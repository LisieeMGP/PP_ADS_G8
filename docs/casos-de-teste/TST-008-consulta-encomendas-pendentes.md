# Script de Teste - TST-008: Consulta de encomendas pendentes

## 1. Identificação

* Identificação única: TST-008
* Caso de teste relacionado: TC-005 Consulta de encomendas
* Caso de uso: UC-004 - Consultar encomendas
* Cenário: Fluxo alternativo - Consulta de encomendas pendentes

## 2. Preparação

### Estado atual do banco de dados antes da execução

* Usuário autenticado no sistema.
* Encomendas existentes:
  * `BR123456789` com status `AGUARDANDO_RETIRADA`
  * `BR987654321` com status `RETIRADA`

### Estado esperado após a execução do caso

* A consulta deve permitir identificar as encomendas que ainda aguardam retirada.
* A encomenda `BR123456789` deve permanecer identificada como pendente.
* A encomenda `BR987654321` não deve ser considerada pendente.
* Nenhum dado deve ser alterado no banco em razão da consulta.

## 3. Passos para execução

1. Acessar a funcionalidade `Consultar encomendas`.
2. Selecionar o filtro ou opção correspondente às encomendas pendentes.
3. Visualizar os registros apresentados.
4. Verificar a situação das encomendas exibidas.

## 4. Resultado esperado

* A encomenda `BR123456789` deve ser apresentada como pendente.
* A encomenda `BR987654321` não deve ser apresentada entre as encomendas pendentes.
* Todos os registros apresentados como pendentes devem possuir status `AGUARDANDO_RETIRADA`.

## 5. Resultado obtido

* [ ] Sucesso
* [ ] Não Executado
* [ ] Falha
* [ ] Cancelado

### Descrição do resultado obtido

* .

### Data da última execução

* __/__/____
