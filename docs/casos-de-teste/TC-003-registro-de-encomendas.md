# Caso de Teste - TC-003: Registro de encomendas

## 1. Identificação

- Identificação única: TC-003
- Nome do caso: Testes de registro de encomendas
- Tipo de teste: Teste de cenário

## 2. Objetivo

Confirmar que a aplicação registra corretamente uma encomenda, preservando a associação com o morador correto e atribuindo o status inicial adequado conforme a regra de negócio do sistema.

## 3. Lista dos scripts de teste

- TST-005 Registro de encomenda com sucesso

## 4. Casos de uso relacionados

- UC-003 Registrar encomenda

## 5. Critérios de validação

- O sistema deve permitir o registro da encomenda com dados válidos.
- O registro deve manter a vinculação correta entre encomenda e morador.
- A encomenda deve ser persistida com o status inicial `AGUARDANDO_RETIRADA`.

## 6. Observações

O cenário principal cobre a criação da encomenda com o morador associado corretamente e o status inicial correspondente ao estado esperado para a entrega em portaria.
