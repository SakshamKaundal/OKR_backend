# OKR Management System

A backend API service for managing **Objectives and Key Results (OKRs)**, built using modern TypeScript tooling with **NestJS**, **Prisma ORM**, and containerized infrastructure using **Podman** and **PostgreSQL**.

This service provides REST APIs to manage objectives and associated key results.

Repository: [https://github.com/SakshamKaundal/OKR_backend](https://github.com/SakshamKaundal/OKR_backend) 

---

## Tech Stack

* **[Node.js](https://nodejs.org/)**
* **[TypeScript](https://www.typescriptlang.org/)**
* **[NestJS](https://nestjs.com/)**
* **[Prisma ORM](https://www.prisma.io/)**
* **[PostgreSQL](https://www.postgresql.org/)**
* **[Podman](https://podman.io/)**
* **[pnpm](https://pnpm.io/)**

---

## Prerequisites

Before getting started, install the following:

### Required Tools

* **Node.js** — Install the LTS version (v20 or above recommended)
* **pnpm** — Fast package manager:

```bash
npm install -g pnpm
```

* **Podman** — Container engine used in place of Docker
* **PostgreSQL** — Database server (optional if using Podman containerized DB)

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SakshamKaundal/OKR_backend.git
cd OKR_backend
```

---

### 2. Install Dependencies

```bash
pnpm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root:

```bash
cp .env.example .env
```

Open `.env` and configure your database:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
```

Replace placeholders with your PostgreSQL credentials.

---

### 4. Database & Containers

Start the Podman virtual machine:

```bash
podman machine start
```

Bring up containerized services:

```bash
podman compose up -d
```

Run database migrations:

```bash
pnpm prisma migrate deploy
```

Generate Prisma client:

```bash
pnpm prisma generate
```

---

### 5. Run the Development Server

```bash
pnpm start:dev
```

The server should start and listen on the default NestJS port **3000** unless configured otherwise in `.env`.

---

## Available Scripts

| Script                       | Description               |
| ---------------------------- | ------------------------- |
| `pnpm start:dev`             | Start in development mode |
| `pnpm prisma migrate deploy` | Run Prisma migrations     |
| `pnpm prisma generate`       | Generate Prisma client    |

---

## Testing

If tests are implemented, the usual NestJS test commands are:

```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```

---

## Project Overview

The repository includes:

```
src/              → Application source
prisma/           → Prisma schema & migrations
test/             → Test files (if any)
docker-compose.yml → Container definitions
```

All business logic, controllers, and modules follow the NestJS modular architecture. ([GitHub][1])

---

## Notes

* Make sure the Podman machine is running before setting up containers.
* You can use any database client to inspect the PostgreSQL database.
* Ensure the `DATABASE_URL` is correct in your `.env` file.

