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
  * `BR111222333` com status `RETIRADA`
  * `BR987654321` com status `RETIRADA`
  * `BR123456789` com status `RETIRADA`
* Deve ser registrada uma nova encomenda para `Joao da Silva`, bloco `A`, unidade `101`, com:
  * descrição: `Encomenda teste pendente`
  * código de rastreio: `BRPENDENTE001`
* Após o registro, a nova encomenda deve estar com status `AGUARDANDO_RETIRADA`.

### Estado esperado após a execução do caso

* A consulta deve permitir identificar somente as encomendas que ainda aguardam retirada.
* A encomenda `BRPENDENTE001` deve ser apresentada como pendente.
* As encomendas `BR111222333`, `BR987654321` e `BR123456789`, que estão com status `RETIRADA`, não devem ser apresentadas entre as pendentes.
* Nenhum dado deve ser alterado no banco em razão da consulta.

## 3. Passos para execução

1. Acessar a funcionalidade de registro de encomendas.
2. Registrar uma nova encomenda para `Joao da Silva`, com descrição `Encomenda teste pendente` e código de rastreio `BRPENDENTE001`.
3. Confirmar que a nova encomenda foi registrada com status `AGUARDANDO_RETIRADA`.
4. Acessar a funcionalidade `Consultar encomendas`.
5. Selecionar a opção `Apenas pendentes`.
6. Visualizar os registros apresentados.
7. Verificar os status das encomendas exibidas.

## 4. Resultado esperado

* A encomenda `BRPENDENTE001` deve ser apresentada como pendente.
* As encomendas `BR111222333`, `BR987654321` e `BR123456789` não devem ser apresentadas entre as encomendas pendentes.
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
