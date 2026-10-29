# Casos de Teste - Sistema de Encomendas

Este diretório reúne os casos de teste e os scripts de teste conforme o padrão da Aula 4.

## Casos de teste (TC)

- [TC-001-autenticacao.md](TC-001-autenticacao.md)
- [TC-002-cadastro-de-moradores.md](TC-002-cadastro-de-moradores.md)
- [TC-003-registro-de-encomendas.md](TC-003-registro-de-encomendas.md)
- [TC-004-retirada-de-encomendas.md](TC-004-retirada-de-encomendas.md)

## Scripts de teste (TST)

- [TST-001-login-com-credenciais-validas.md](TST-001-login-com-credenciais-validas.md)
- [TST-002-login-com-senha-invalida.md](TST-002-login-com-senha-invalida.md)
- [TST-003-cadastro-morador-sucesso.md](TST-003-cadastro-morador-sucesso.md)
- [TST-004-cadastro-morador-mesmo-endereco-falha.md](TST-004-cadastro-morador-mesmo-endereco-falha.md)
- [TST-005-registro-encomenda-sucesso.md](TST-005-registro-encomenda-sucesso.md)
- [TST-006-retirada-encomenda-sucesso.md](TST-006-retirada-encomenda-sucesso.md)
- [TST-007-retirada-encomenda-falha.md](TST-007-retirada-encomenda-falha.md)

## Observação

Os documentos seguem o padrão da Aula 4:

- os casos de teste são identificados por `TC-...` e agrupam os scripts relacionados;
- os scripts de teste são identificados por `TST-...` e descrevem a execução detalhada do cenário;
- a preparação informa o estado do banco antes e depois da execução;
- a seção de resultado obtido contém as opções: Sucesso, Não Executado, Falha e Cancelado.
