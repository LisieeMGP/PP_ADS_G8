# Caso de Teste - TC-001: Autenticação do sistema

## 1. Identificação

- Identificação única: TC-001
- Nome do caso: Testes de autenticação do sistema
- Tipo de teste: Teste de cenário

## 2. Objetivo

Validar a capacidade do sistema de autenticar usuários com credenciais válidas e rejeitar acessos com credenciais inválidas, assegurando que o fluxo de login cumpra os requisitos funcionais estabelecidos.

## 3. Lista dos scripts de teste

- TST-001 Login com credenciais válidas
- TST-002 Login com senha inválida

## 4. Casos de uso relacionados

- UC-001 Realizar login

## 5. Critérios de validação

- O sistema deve permitir o acesso quando as credenciais são válidas.
- O sistema deve bloquear o acesso quando a senha estiver incorreta.
- A autenticação deve manter a integridade da sessão e os fluxos subsequentes do sistema.

## 6. Observações

Este caso de teste agrupa os cenários principais e alternativos da autenticação, conforme o modelo proposto na Aula 4 para testes de lançamento baseados em cenários de uso.
