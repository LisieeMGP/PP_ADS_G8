# Script de Teste - TST-007: Falha ao registrar retirada de encomenda

## 1. Identificação

- Identificação única: TST-007
- Caso de teste relacionado: TC-004 Retirada de encomendas
- Caso de uso: UC-005 - Registrar retirada de encomenda
- Cenário: Fluxo alternativo com falha da API

## 2. Preparação

- Usuário autenticado no sistema.
- Existe uma encomenda pendente selecionável.
- A API de retirada está indisponível ou responde com erro para a operação.

## 3. Passos para execução

1. Acessar a funcionalidade de retirada de encomendas.
2. Selecionar uma encomenda pendente.
3. Clicar em **Confirmar retirada**.

## 4. Resultado esperado

- A interface deve apresentar uma mensagem informando que não foi possível registrar a retirada.
- A mensagem de sucesso não deve ser apresentada.
- A encomenda deve permanecer disponível para uma nova tentativa enquanto continuar pendente.

## 5. Resultado obtido

- [ ] Sucesso
- [ ] Não Executado
- [ ] Falha
- [ ] Cancelado

### Descrição do resultado obtido

-

### Data da última execução

- **/**/\_\_\_\_
