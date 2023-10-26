# API Labedit 


API para acesso à banco de dados criado para projeto de rede social no bootcamp da escola Labenu.

### Acesso

Html do projeto:

[Click here to see more](https://proj-backend-onny.onrender.com)

Repostório Frontend:

[Click here to see more]([https://proj-backend-onny.onrender.com](https://github.com/thaisbuenopinto/project-frontend))

### Documentação

[Click here to see more](https://documenter.getpostman.com/view/26594360/2s9YRCXrF7)


## : Descrição

Projeto de Rede Social com banco de dados de controle de usuários, postagens, comentários e curtidas. 

### SignUp

```
// Request POST /users/signup
// body JSON
{
    "name": "Catarina",
    "email":"catarina@email.com",
    "password":"56789109"
}

// Response
// status 201 CREATED
{
    "message": "Cadastro realizado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"
}
```

---

### Login

```
// Request POST /users/login
// body JSON
{
    "email":"fabio@email.com",
    "password":"56789109"
}

// Response
// status 200 OK
{
    "message": "Login realizado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"
}
```

---

### Get all Users

```
// Request GET /users
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// Response
// status 200 OK
[
    {
        "id": "u001",
        "name": "thais",
        "email": "thais@email.com",
        "role": "ADMIN",
        "createdAt": "2023-10-22 12:58:18"
    },
    {
        "id": "ad7c9766-0c97-4fbf-b474-096a3919f5f0",
        "name": "test",
        "email": "test@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-22 10:01:36"
    },
    {
        "id": "c42d2346-5e2d-42a3-87ba-8b5905370a4d",
        "name": "testanother",
        "email": "testanother@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-22 10:03:02"
    },
    {
        "id": "69bb8ca9-e094-4ccb-a578-587bce4d8320",
        "name": "judas",
        "email": "judas@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-22 10:03:25"
    }
  
]
```

### Edit User By Email

```
// Request PUT /users/teste@gmail.com
// path params = :email
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// body JSON
{
    "password":"58796341"
}

// Response
// status 200 OK
{
    "message": "Usuário alterado com sucesso!"
}
```

---

### Delete User By Email

```
// Request DELETE /users/teste@gmail.com
// path params = :email
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// Response
// status 200 OK
{
    "message": "Usuário deletado com sucesso!"
}
```

---

### Create new Post

```
// Request POST /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// body JSON
{
    "content": "Mudei, vou fazer festa de Halloween!"
}

// Response
// status 201 CREATED
{
    "content": "Mudei, vou fazer festa de Halloween!"
}
```
---

### Get all Posts

```
// Request GET /products
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// Response
// status 200 OK
[
    {
        "id": "b6793c3f-56da-473c-b8b3-d22282f2ace3",
        "content": "Mudei, vou fazer festa de Halloween!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-22 10:17:54",
        "updatedAt": "2023-10-22 11:19:42",
        "creator": {
            "id": "d5b87275-c28f-4705-9f04-dc2d1db912b0",
            "name": "outra"
        },
        "amountComment": 0
    },
    {
        "id": "e4945483-7187-4bc0-afcb-2e0b3c4813d0",
        "content": "Mudei, vou fazer festa de Halloween!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-22 11:22:09",
        "updatedAt": "2023-10-23 18:36:19",
        "creator": {
            "id": "d5b87275-c28f-4705-9f04-dc2d1db912b0",
            "name": "outra"
        },
        "amountComment": 0
    },
    {
        "id": "e1e3651a-87cf-40ca-896d-68f83088ec74",
        "content": "Venham resolver isso logo!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-23 15:15:44",
        "updatedAt": "2023-10-23 15:15:44",
        "creator": {
            "id": "44ebef0c-3098-4358-bc0e-47e641d66a9b",
            "name": "people"
        },
        "amountComment": 0
    },
    {
        "id": "21f1ff86-259c-4483-859e-bb0eb4cbb909",
        "content": "tentativa 1001 de resolver!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-23 15:41:35",
        "updatedAt": "2023-10-23 15:41:35",
        "creator": {
            "id": "768df11a-f007-4f21-849a-d10b3a1c59bc",
            "name": "catarina"
        },
        "amountComment": 3
    },
    {
        "id": "adc9c402-20ed-4a01-84c8-6ad29701ef48",
        "content": "tentativa 1001 de resolver!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-23 17:26:53",
        "updatedAt": "2023-10-23 17:26:53",
        "creator": {
            "id": "768df11a-f007-4f21-849a-d10b3a1c59bc",
            "name": "catarina"
        },
        "amountComment": 0
    },
    {
        "id": "9955a8d9-0f69-4d1f-9785-7ec2d3676f08",
        "content": "tentativa 1007 de resolver!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-10-23 18:35:37",
        "updatedAt": "2023-10-23 18:35:37",
        "creator": {
            "id": "768df11a-f007-4f21-849a-d10b3a1c59bc",
            "name": "catarina"
        },
        "amountComment": 0
    }
]

```

### Edit Post By ID

```
// Request PUT /posts/9955a8d9-0f69-4d1f-9785-7ec2d3676f08
// path params = :id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// body JSON
{
    "content": "Mudei, vou fazer festa de Halloween!"
}

// Response
// status 200 OK
{
    "content": "Mudei, vou fazer festa de Halloween!"
}
```

---

### Edit Post Like Dislike

```
// Request PUT /posts/9955a8d9-0f69-4d1f-9785-7ec2d3676f08/like
// path params = :id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// body JSON
{
    "like": true
}

// Response
// status 200 OK
```

```
// Request PUT /posts/9955a8d9-0f69-4d1f-9785-7ec2d3676f08/like
// path params = :id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// body JSON
{
    "like": false
}

// Response
// status 200 OK
```

---

### Delete Post By ID

```
// Request DELETE /posts/6185caec-5808-4f1c-a503-f737f34e4307
// path params = :id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1Yjg3Mjc1LWMyOGYtNDcwNS05ZjA0LWRjMmQxZGI5MTJiMCIsIm5hbWUiOiJvdXRyYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTc5ODA1MDksImV4cCI6MTY5ODU4NTMwOX0.9RCsuoGzJ7Z8WP4MiNL51g2k6Xqmuz3i7-vIydFSIo0"

// Response
// status 200 OK
{
    "message": "Post deletado com sucesso!"
}
```

---


### :woman: Author

<table>
  <tr>
    <td align="center">
        <img 
            src="https://avatars.githubusercontent.com/u/114695238?v=4" 
            width="100px;" 
            alt="" 
        /> <br />
        <sub> <a href="https://github.com/thaisbuenopinto"> <b>Thaís Bueno Pinto</b> </a> </sub>
    </td>
  </tr>
</table>

