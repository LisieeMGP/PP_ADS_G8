# Script de Teste - TST-005: Registro de encomenda com sucesso

## 1. Identificação

- Identificação única: TST-005
- Caso de teste relacionado: TC-003 Registro de encomendas
- Caso de uso: UC-003 - Registrar encomenda
- Cenário: Fluxo principal

## 2. Preparação

### Estado atual do banco de dados antes da execução

- Moradores cadastrados:
    - `Joao da Silva` / bloco `A` / unidade `101`
    - `Maria Oliveira` / bloco `B` / unidade `204`
    - `Carlos Mendes` / bloco `A` / unidade `302`
- Encomendas já cadastradas:
    - `BR123456789` para `A-101`
    - `BR987654321` para `B-204`
- O código de rastreio informado neste teste ainda não existe.

### Estado esperado após a execução do caso

- A encomenda deve ser persistida na tabela `encomendas`.
- O status inicial deve ser `AGUARDANDO_RETIRADA`.
- O registro deve ficar associado ao morador correto e ao usuário autenticado.

## 3. Passos para execução

1. Acessar a funcionalidade de registro de encomendas.
2. Selecionar o morador `Joao da Silva`.
3. Informar a descrição: `Monitor para escritório`.
4. Informar o código de rastreio: `BR111222333`.
5. Confirmar o cadastro.

## 4. Resultado esperado

- A encomenda deve ser cadastrada com sucesso.
- O sistema deve exibir confirmação de registro.
- A encomenda deve aparecer na consulta de encomendas com status `AGUARDANDO_RETIRADA`.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_
