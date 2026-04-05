# Gerenciador de Tarefas API

API em Node.js + Express + Prisma para gerenciamento de usuários, times, tarefas, membros e histórico de tarefas.

## Requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose
- PostgreSQL

## Como rodar localmente

1. Instale as dependencies:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com estas variáveis:

```env
PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskManager?schema=public"
JWT_SECRET="sua_chave_secreta"
```

3. Suba o banco com Docker:

```bash
docker compose up -d
```

4. Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie a API:

```bash
npm run dev
```

A API vai subir em `http://localhost:3333`.

## Como rodar os testes

Para rodar os testes em modo watch:

```bash
npm run test:dev
```

## Deploy

O projeto ainda nao tem uma URL publica de deploy cadastrada neste repositório.

## Endpoints

### Autenticação

- `POST /sessions`
  - Faz login e retorna um token JWT.
  - Body:
    - `email`
    - `password`

### Usuários

- `POST /users`
  - Cria um usuário novo.
  - Body:
    - `name`
    - `email`
    - `password`
- `GET /users`
  - Lista usuários.
  - Requer autenticação e perfil `admin`.

### Times

- `POST /teams`
  - Cria um time.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `name`
    - `description`
- `GET /teams`
  - Lista times.
  - Requer autenticação e perfil `admin`.
- `PATCH /teams/:id`
  - Atualiza um time.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `name`
    - `description`
- `DELETE /teams`
  - Remove um time.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `id`

### Membros do time

- `POST /team-member`
  - Vincula um usuário a um time.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `userId`
    - `teamId`
- `GET /team-member`
  - Lista os vínculos de usuários com times.
  - Requer autenticação e perfil `admin`.
- `DELETE /team-member/:id`
  - Remove um vinculo.
  - Requer autenticação e perfil `admin`.

### Tarefas

- `POST /tasks`
  - Cria uma tarefa.
  - Requer autenticação.
  - Body:
    - `title`
    - `description`
    - `priority` (`high`, `medium`, `low`)
    - `teamId`
  - O campo `assignedTo` vem do usuário autenticado.
- `GET /tasks`
  - Lista tarefas.
  - Admin ve todas.
  - Member ve apenas as tarefas atribuídas a ele.
- `PATCH /tasks/:id`
  - Atualiza uma tarefa.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `title`
    - `description`
    - `priority`
    - `teamId`
- `DELETE /tasks/:id`
  - Remove uma tarefa.
  - Requer autenticação e perfil `admin`.
- `GET /tasks/status?status=pending|in_progress|completed`
  - Lista tarefas por status.
  - Requer autenticação.
- `PATCH /tasks/:id/status`
  - Atualiza o status de uma tarefa.
  - Requer autenticação.
  - Body:
    - `status`
- `GET /tasks/priority?priority=high|medium|low`
  - Lista tarefas por prioridade.
  - Requer autenticação.
- `PATCH /tasks/:id/priority`
  - Atualiza a prioridade de uma tarefa.
  - Requer autenticação.
  - Body:
    - `priority`
- `PATCH /tasks/:id/assign`
  - Atribui a tarefa a outro usuário.
  - Requer autenticação e perfil `admin`.
  - Body:
    - `userId`

### Histórico de tarefas

- `POST /task-history`
  - Cria um registro de histórico da tarefa.
  - Requer autenticação.
  - Body:
    - `taskId`
    - `newStatus`
- `GET /task-history`
  - Lista o histórico das tarefas.
  - Requer autenticação.

## Observações

- Se faltar `DATABASE_URL` ou `JWT_SECRET`, a aplicação nao inicia.
- O banco usado no Docker e `taskManager`.
- Para testar as rotas protegidas, envie o token no header `Authorization: Bearer <token>`.
