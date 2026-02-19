# OKR Backend API

NestJS-based backend API for the Incubyte OKR application.

## Overview

This backend provides REST APIs for:

- Objectives CRUD
- Key Results CRUD
- AI-generated OKRs using Google Gemini

It uses Prisma ORM with PostgreSQL, and runs the database via Podman.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Podman
- **Package Manager**: pnpm
- **AI**: Google Gemini API

## Setup Instructions

### 1. Navigate to Backend Directory

```bash
cd OKR_backend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Database

Start Podman machine:

```bash
podman machine start
```

Start PostgreSQL container:

```bash
podman compose up -d
```

PostgreSQL will run on `localhost:5433` (container `5432`).

### 4. Configure Environment Variables

Create local environment file:

```bash
cp .env.example .env
```

Ensure these values are set in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5433/okrs"
PORT=3000
GOOGLE_API_KEY="your_google_api_key_here"
```

### 5. Setup Database Schema

Run migrations:

```bash
pnpm prisma migrate deploy
```

Generate Prisma client:

```bash
pnpm prisma generate
```

### 6. Start Development Server

```bash
pnpm start:dev
```

Backend starts at **`http://localhost:3000`**.

## Available Commands

- `pnpm start:dev` - Start backend in watch mode
- `pnpm build` - Build production bundle
- `pnpm test` - Unit tests
- `pnpm test:e2e` - End-to-end tests
- `pnpm test:cov` - Coverage report
- `pnpm prisma migrate deploy` - Apply migrations
- `pnpm prisma generate` - Generate Prisma client

## API Notes

- CORS is enabled.
- Validation is enabled globally (`ValidationPipe` with transform + whitelist).
- AI endpoint: `POST /ai/generate-okr`

## Frontend Integration

Run the frontend after backend setup:

[Frontend Documentation](https://github.com/SakshamKaundal/Incubyte_okr/blob/main/README.md)
