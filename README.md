# API

GET /todos

```
resposne type
{
    id: number
    title: string
}[]
```

---

POST /todos

```
request body
{
  title: string
}
```

```
resposne type
{
    id: number
    title: string
}
```

---

DELETE /todos/:id

```
response type
{ id: number }
```
