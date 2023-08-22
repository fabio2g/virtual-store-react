# Documentação da API: Registro de Usuário

Bem-vindo à documentação da API Virtual Store.
## Endpoints

### 1. Registro de Usuário

Registre um novo usuário e obtenha um token de acesso.

**URL:** `http://localhost:3000/user/signup`

**Método:** `POST`

**Parâmetros de Requisição:**

-   `name` (string): Nome do usuário.
-   `email` (string): Endereço de email do usuário.
-   `password` (string): Senha do usuário.
-   `confirmPassword` (string): Confirmação da senha do usuário.

**Exemplo de Requisição:**

```http
POST /user/signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": true,
    "token": "SEU_TOKEN_DE_ACESSO"
}
```

**Resposta Malsucedida:**

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "status": false,
    "error": "MENSAGEM_DE_ERRO"
}
```

### 2. Login de Usuário

Faça login na aplicação utilizando os dados de login que foram previamente cadastrados para acessar todos os recursos disponibilizados pela API.

**URL:** `http://localhost:3000/user/signin`

**Método:** `POST`

**Parâmetros de Requisição:**

-   `email` (string): Endereço de email registrado na conta do usuário.
-   `password` (string): Senha registrada na conta do usuário.

**Exemplo de Requisição:**

```http
POST /user/signin HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "123456"
}
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": true,
    "token": "SEU_TOKEN_DE_ACESSO"
}
```

**Resposta Malsucedida:**

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "status": false,
    "error": "MENSAGEM_DE_ERRO"
}
```
