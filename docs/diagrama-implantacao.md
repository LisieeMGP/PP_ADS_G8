# Diagrama de Implantação - PP ADS G8

A aplicação web do sistema de encomendas é composta por um cliente Angular, uma API NestJS e um banco PostgreSQL. A implantação atual está publicada no Render.

```mermaid
flowchart LR
    subgraph Usuario[Usuário / Operador]
        U[Usuário do condomínio]
    end

    subgraph Cliente[Dispositivo do Usuário]
        B[Navegador Web]
    end

    subgraph Render[Render - Ambiente de Produção]
        subgraph WebService[Serviço Web do Frontend]
            F[Frontend Angular\nhttps://pp-ads-g8.onrender.com]
        end

        subgraph ApiService[Serviço Web da API]
            A[API NestJS\nhttps://encomendas-api.onrender.com]
        end

        subgraph DbService[Serviço de Banco de Dados]
            P[PostgreSQL\nBanco de Dados\nencomendas_db_n4hm]
        end
    end

    U -->|Acessa| B
    B -->|HTTPS| F
    F -->|Requisições HTTP/JSON| A
    A -->|Consultas e operações SQL| P

    classDef user fill:#E3F2FD,stroke:#1565C0,color:#0D47A1;
    classDef client fill:#E8F5E9,stroke:#2E7D32,color:#1B5E20;
    classDef server fill:#FFF3E0,stroke:#EF6C00,color:#E65100;
    classDef db fill:#F3E5F5,stroke:#6A1B9A,color:#4A148C;

    class U user;
    class B client;
    class F,A server;
    class P db;
```

## UML de implantação

```mermaid
flowchart TB
    subgraph N1[Cliente]
        N1A[Dispositivo do usuário]
        N1B[Navegador Web]
    end

    subgraph N2[Ambiente Render]
        subgraph N2A[Servidor de Aplicação Web]
            N2A1[Frontend Angular\npp-ads-g8.onrender.com]
        end

        subgraph N2B[Servidor de Aplicação Backend]
            N2B1[API NestJS\nencomendas-api.onrender.com]
        end

        subgraph N2C[Servidor de Banco de Dados]
            N2C1[PostgreSQL\nBanco de dados\nencomendas_db_n4hm]
        end
    end

    N1A -->|Acesso via internet| N1B
    N1B -->|HTTPS| N2A1
    N2A1 -->|HTTP/JSON| N2B1
    N2B1 -->|SQL / JDBC| N2C1

    classDef cliente fill:#E3F2FD,stroke:#1E88E5,stroke-width:1.5px,color:#0D47A1;
    classDef app fill:#E8F5E9,stroke:#43A047,stroke-width:1.5px,color:#1B5E20;
    classDef dados fill:#F3E5F5,stroke:#8E24AA,stroke-width:1.5px,color:#4A148C;

    class N1A,N1B cliente;
    class N2A1,N2B1 app;
    class N2C1 dados;
```

## Observações

- O cliente acessa a aplicação por meio do navegador.
- O frontend Angular consome a API REST da aplicação.
- A API NestJS autentica usuários e implementa as regras de negócio.
- O PostgreSQL armazena moradores, encomendas, usuários e dados de controle de retirada.
- Os links de comunicação são realizados via HTTPS entre cliente e frontend e HTTP/JSON entre frontend e backend.
- O banco de dados está em um serviço PostgreSQL do Render, separado do serviço web da API.
- A publicação atual foi realizada no Render com os seguintes endpoints públicos:
    - Frontend: https://pp-ads-g8.onrender.com
    - API: https://encomendas-api.onrender.com
