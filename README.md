Воркшоп по созданию GraphQL сервера на Node.JS

Чтобы продолжить, перейдите к шагу 4

```bash
git checkout step4-start
```

Интегрируем [Prisma](prisma.io) в проект.

1.  `npm install -g prisma`
2.  `prisma init database`
3.  `cd database && prisma deploy`
4.  `cd ..`
5.  `yarn add -D graphql-cli` загрузить схему призмы
6.  `mkdir generated`
7.  `yarn graphql get-schema --project prisma`
8.  `touch .graphqlconfig.yml`

```yml
projects:
  app:
    schemPath: src/schema.graphql
    extensions:
      endpoints:
        default: http://localhost:4000
  prisma:
    schemaPath: src/generated/prisma.graphql
    extensions:
      prisma: prisma/prisma.yml
```

6.  Optional: добавьте в scripts

```json
scripts {
  "update-prisma-sdl": "graphql get-schema --project prisma"  
}
```

Факт: Prisma руководствуется https://www.opencrud.org для генерации SDL для реляционной схемы

## ФАК

1.  Гит не видит нужных веток

```
git fetch origin
```

2.  Как подсмотреть решение, не теряя прогресс?

```bash
# Текущая ветка git checkout step3-start
git stash # сохраните изменения
git checkout step3 # перейдите в ветку с решением
git checkout step3-start # вернитесь
git stash apply # загрузите сохранение
```

---

# Step 2

Go back to the [`master`](https://github.com/nikolasburk/graphqlday-workshop) branch.

## Usage

```bash
node src/index.js
```

## Sample queries/mutations

```graphql
query {
  posts(searchString: "QL") {
    id
    title
    content
    published
  }
}
```

```graphql
query {
  post(id: "post-0") {
    id
    title
    content
    published
  }
}
```

```graphql
mutation {
  createDraft(
    title: "GraphQL Bindings"
    content: "Reuse and compose GraphQL APIs"
  ) {
    id
    published
  }
}
```

```graphql
mutation {
  publish(id: "post-0") {
    id
    published
  }
}
```

```graphql
mutation {
  deletePost(id: "post-0") {
    id
    title
    content
    published
  }
}
```
