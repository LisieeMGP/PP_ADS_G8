# Caso de Teste - TC-004: Retirada de encomendas

## 1. Identificação

- Identificação única: TC-004
- Nome do caso: Testes de retirada de encomendas
- Tipo de teste: Teste de cenário

## 2. Objetivo

Validar que a retirada de uma encomenda altera corretamente o status da entrega, registra a data de movimentação e identifica o usuário responsável pela ação, conforme as regras de negócio do sistema.

## 3. Lista dos scripts de teste

- TST-006 Retirada de encomenda com sucesso
- TST-007 Falha ao registrar retirada de encomenda

## 4. Casos de uso relacionados

- UC-005 Registrar retirada de encomenda

## 5. Critérios de validação

- O sistema deve alterar o status da encomenda para `RETIRADA`.
- A data da retirada deve ser registrada corretamente.
- O usuário responsável pela retirada deve ser armazenado e associado ao evento.
- Após a resposta da API, a interface deve informar o sucesso ou a falha da retirada.

## 6. Observações

Este caso representa a confirmação da entrega de uma encomenda pendente. O fluxo de sucesso é descrito em TST-006 e a resposta a uma falha da API em TST-007.
