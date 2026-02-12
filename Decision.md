# Why nest js for OKR App?

## 1. Structured Architecture

NestJS follows a **modular architecture** inspired by Angular.

- Clear separation of concerns (Controller, Service, Module)
- Easy to maintain codebases
- Encourages clean architecture

## 2. Built-in TypeScript Support

NestJS is built with **TypeScript by default**.

- Strong typing
- Fewer runtime errors
- Improved maintainability

## 3. Dependency Injection (DI)

NestJS provides a powerful **dependency injection system** out of the box.

- Better code reusability
- Easier testing
- Loosely coupled components (easy to write the unit test)

## 4. Production-Ready Features

NestJS includes many built-in enterprise features (no need to configure it manually)

- Middleware
- Guards
- Interceptors
- Pipes (validation)
- Exception filters
- Modular routing

## 5. Testability

- Built-in testing utilities
- Easy mocking with dependency injection
- Works well with Jest


##  Why Not Express?

While **Express.js** is a powerful and flexible framework, it lacks built-in architectural enforcement and enterprise features.

### Comparison: NestJS vs Express

| Feature               | NestJS                  | Express                        |
| --------------------- | ----------------------- | ------------------------------ |
| TypeScript Support    | Built-in                | Manual configuration required  |
| Dependency Injection  | Built-in                | Not available                  |
| Authentication Guards | Built-in                | Manual implementation          |
| Testability           | Designed for testing    | Manual setup required          |

# Why Not Ruby (Ruby on Rails) for OKR App?

Although Ruby on Rails is a powerful backend framework, it was not chosen due to ecosystem and project alignment reasons.

### Comparison: NestJS vs Ruby on Rails

| Factor             | NestJS                     | Ruby on Rails          |
| ------------------ | -------------------------- | ---------------------- |
| Language           | TypeScript                 | Ruby                   |
| Frontend Alignment | Same language (TypeScript) | Different language     |
| Team Expertise     | Familiar with ts           | Not familiar with Ruby |
| Ecosystem          | JavaScript/Node.js         | Ruby ecosystem         |



```aiignore
erDiagram
    OBJECTIVE {
        int id PK "Auto Increment"
        string title
        datetime createdAt "Default: now()"
    }

    KEYRESULT {
        int id PK "Auto Increment"
        string description "Nullable"
        boolean isCompleted "Default: false"
        int progress
        int target "Default: 100"
        string metric "Default: %"
        int objectiveId FK
    }

    OBJECTIVE ||--o{ KEYRESULT : "has many"

```