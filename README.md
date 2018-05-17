Воркшоп по созданию GraphQL сервера на Node.JS

Чтобы продолжить, перейдите к шагу 1

```bash
git checkout step1-start
```

## ФАК

1.  Гит не видит нужных веток

```
git fetch origin
```

2.  Как подсмотреть решение, не теряя прогресс?

```bash
# Текущая ветка git checkout step0-start
git stash # сохраните изменения
git checkout step0 # перейдите в ветку с решением
git checkout step0-start # вернитесь
git stash apply # загрузите сохранение
```

---

# Step 0

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
query {
  posts {
    id
    title
    content
    published
  }
}
```
