# Threads App GraphQL

A backend service inspired by Threads, built with Node.js, GraphQL, Prisma, and Docker.

## What it does

This project provides a GraphQL API for a Threads-like application with:
- user signup and login
- thread creation and querying
- user-thread relationships
- Like / Unlike threads
- JWT authentication support
- Prisma-powered database access

## Tech stack

- Node.js
- TypeScript
- Express
- Apollo GraphQL
- Prisma
- PostgreSQL
- Docker / Docker Compose

## Features

- auth: signup/login with JWT
- threads: create, query, and relate threads to users
- Like / Unlike threads
- relations: user/thread relationships via Prisma
- GraphQL API for flexible client access

## Local setup

### Prerequisites

- Node.js 20+ installed
- PostgreSQL available locally or in Docker
- Docker & Docker Compose (optional)

### Install

```bash
npm install
```

### Environment

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Then set values for:
- `DATABASE_URL`
- `JWT_SECRET`

### Database

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run locally

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## Git workflow

Follow a feature-branch workflow:

```bash
git checkout -b feature/add-auth
git add .
git commit -m "feat: add login mutation"
git push -u origin feature/add-auth
```

Use descriptive commit messages:

- `feat: add create thread mutation`
- `fix: resolve relation bug in Thread.createdBy`
- `refactor: move prisma to context`

