# Setup Instructions

## 1. Install pnpm
```
pnpm i
```
## 2. Database setup
```
podman machine start

pnpm prisma migrate deploy

pnpm prisma generate

podman compose up
```

## 3. Run the application
```
pnpm start:dev
```