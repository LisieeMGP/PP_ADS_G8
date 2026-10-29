# Caso de Teste - TC-002: Cadastro de moradores

## 1. Identificação

- Identificação única: TC-002
- Nome do caso: Testes de cadastro de moradores
- Tipo de teste: Teste de cenário

## 2. Objetivo

Avaliar o comportamento do sistema na criação de moradores, verificando tanto o fluxo de cadastro bem-sucedido quanto a rejeição de registros inconsistentes ou duplicados.

## 3. Lista dos scripts de teste

- TST-003 Cadastro de morador com sucesso
- TST-004 Cadastro de segundo morador no mesmo endereço (falha)

## 4. Casos de uso relacionados

- UC-002 Cadastrar morador

## 5. Critérios de validação

- O sistema deve permitir o cadastro quando os dados são válidos.
- Após a resposta da API, a interface deve informar o sucesso do cadastro.
- O sistema deve impedir cadastros com dados obrigatórios ausentes.
- O sistema deve bloquear a duplicidade de endereço por bloco e unidade quando a regra de integridade for violada.
- Em caso de falha, a interface deve informar o erro e preservar os dados digitados para nova tentativa.

## 6. Observações

A validação da regra de unicidade de endereço é relevante para a integridade do banco de dados, especialmente na combinação bloco + unidade, que constitui uma propriedade de domínio do sistema.
