# Vizitka

Цифровая визитка на GraphQL: профиль, ссылки, навыки, опыт работы и проекты. Данные можно смотреть через Apollo Sandbox.

**Стек:** TypeScript, Node.js 22, NestJS 11, GraphQL (Apollo Server 5, code-first), Prisma 6, PostgreSQL 17, Docker

## Запуск

```bash
docker compose up --build
```

Откройте http://localhost:3000/graphql. Миграции и заполнение базы выполняются автоматически при старте контейнера.

### Без Docker для приложения

```bash
cp .env.example .env
docker compose up -d db
npm ci
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

Чтобы видеть SQL-запросы в логе, задайте `PRISMA_LOG_QUERIES=true`.

## Пример запроса

```graphql
query {
  profile {
    name
    description
    links { title url }
    skills { name category }
    experience {
      company
      position
      startDate
      endDate
      achievements
      period { isCurrent durationMonths }
    }
    projects { name url description }
  }
}
```

| Query | Описание |
|---|---|
| `profile(id: ID)` | Профиль по `id` или основной профиль, если `id` не передан |
| `profiles` | Все профили |

## Архитектура

- **Слои:** resolver (GraphQL), service (бизнес-логика), repository (Prisma). У `link`, `skill` и `project` сервисов нет, так как логики там нет.
- **Решение N+1:** связи профиля загружаются только если запрошены, через DataLoader, который создаётся на каждый запрос. Полный запрос профиля выполняет 5 SQL-запросов.