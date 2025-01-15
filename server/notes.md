

```
docker run --name fixer-finder-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=fixerfinder -e POSTGRES_DB=fixerfinder -p 5432:5432 -d fixer-finder-postgres
```


```
curl -X POST http://localhost:4000/users \
-H "Content-Type: application/json" \
-d '{"email": "test4@example.com", "password": "password123"}'
```