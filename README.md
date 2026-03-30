# Gerenciador de Tarefas API

API em Node.js + Express + Prisma para gerenciamento de tarefas, equipes e membros.

## Requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose (recomendado para o banco)

## 1) Instalar dependencias

Na raiz do projeto, rode:

npm install

## 2) Configurar variaveis de ambiente

Crie um arquivo `.env` na raiz com este conteudo:

PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskManager"
JWT_SECRET="sua_chave_secreta"

## 3) Subir o banco de dados (Docker)

Rode:

docker compose up -d

Isso sobe um PostgreSQL com:

- usuario: postgres
- senha: postgres
- banco: taskManager
- porta: 5432

## 4) Aplicar migrations do Prisma

Rode:

npx prisma migrate dev --name init

## 5) Iniciar o servidor

Rode:

npm run dev

Servidor sera iniciado na porta definida em `PORT`.

## Fluxo rapido (resumo)

1. npm install
2. criar `.env`
3. docker compose up -d
4. npx prisma migrate dev --name init
5. npm run dev

## Comandos uteis

- Parar containers: docker compose down
- Ver logs da API (quando estiver rodando): acompanhe o terminal do comando npm run dev
- Abrir Prisma Studio: npx prisma studio

## Observacoes

- O projeto usa validacao de ambiente. Se faltar `DATABASE_URL` ou `JWT_SECRET`, a API nao inicia.
- Se voce nao quiser Docker, use um PostgreSQL local e ajuste a `DATABASE_URL` no `.env`.
