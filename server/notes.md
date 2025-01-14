

```
docker run --name fixer-finder-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=fixerfinder -e POSTGRES_DB=fixerfinder -p 5432:5432 -d fixer-finder-postgres
```