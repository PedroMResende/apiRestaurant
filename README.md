# apiRestaurant

API REST para gerenciamento de um restaurante, permitindo o controle de mesas, sessões de mesa, pedidos e produtos.

O sistema possibilita:
- Abrir e fechar mesas
- Associar pedidos a uma sessão ativa
- Calcular o total consumido por mesa
- Listar pedidos por sessão

Projeto desenvolvido com foco em **estudo** e **portfólio**, seguindo boas práticas de organização, validação e arquitetura REST.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- SQLite
- Knex (Query Builder)
- Zod (validação de dados)

> ❌ O projeto **não possui autenticação**  
> ❌ O projeto **não possui testes automatizados**

---

## Funcionalidades

- CRUD de **produtos**
- Listagem de **mesas**
- Abertura e fechamento de **sessões de mesa**
- Criação de **pedidos** vinculados a uma sessão
- Listagem de pedidos por sessão de mesa
- Cálculo do **total consumido** por sessão

---

## Estrutura do Projeto

```txt
src/
 ├── controllers/     # Controllers da aplicação
 ├── database/        # Banco de dados, migrations e seeds
 │   ├── migrations/
 │   ├── seeds/
 │   ├── types/
 │   ├── database.db
 │   └── knex.ts
 ├── middlewares/     # Middlewares globais
 ├── routes/          # Definição das rotas
 ├── utils/           # Utilitários
 └── server.ts        # Inicialização do servidor

knexfile.ts
requests_Insomnia.yaml
tsconfig.json
```

## Modelagem do banco de dados 

O projeto utiliza 4 tabelas principais 

- tables -> mesas do restaurante 

- tables_sessions -> sessões de uso da mesa (aberta ou fechada)

- products -> tabela com os produtos disponíveis 

- orders -> pedidos associados as sessões das mesas 

## Rotas da API 

### products

- GET /products : Lista todos os produtos 

- POST /products: Cria um produto 

- PUT /products/:id : Atualiza um produto 

- DELETE /products/:id : Exclui um produto 

**Exemplo:**

```json
{
    "name" : "Porção de batata frita", 
    "price" : 49.90
}
```
### tables

- GET /tables : Lista as mesas 

### tables_sessions 

- POST /tables_sessions : Abre uma nova sessão para uma mesa 

- GET /tables_sessions : Lista todas as sessões 

- PATCH /tables_session : Fecha a sessão de uma mesa já aberta 

**Exemplo:**

```json
{
    "table_id" : 7
}
```

### orders 

- POST /orders : Criar um novo pedido e associar uma sessão. 

- GET /orders/session-table/:table_session_id : Encontra os pedidos por cada sessão. 

- GET /orders/session-table/:table_session_id/total : Encontra o total da sessão da mesa (Fecha a conta!)

**Exemplo:**

```json
{
    "table_session_id" : 4, 
    "product_id" : 56, 
    "quantity" : 3
}
```

## Como rodar o projeto 

### Instalar as dependências 

```bash
npm intall 
```

### Rodar migrations 

```bash
npm run knex -- migrate:latest 
```

### Rodar seeds 

```bash
npm run knex -- seed:run
```

### Inicializar o servidor 

```bash
npm run dev
```

> A api ficará disponível em http://localhost:3333

## Testes da rota 

- O projeto vai com um arquivo exportado do Insomnia para realizar todas as requisições e testes nas rotas. 

## Observações técnicas 

- Arquitetura MVC 

- Validação de dados com ZOD

- Uso de SQLite para simplicidade em ambiente local (indico o beekeeper studio para leitura)

- Aplicação dos padrões REST 

- Projeto ideal para estudo do CRUD e relacionamentos entre entidades 

## Autor 

- Pedro Medeiros Resende 

## Melhorias futuras 

- Autenticação JWT 

- Adicionar testes automatizados (Jest + Supertest)

- Documentação com Swagger 

- Paginação e filtros nas listagens

