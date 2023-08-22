# Documentação da API

Bem-vindo à documentação da API Virtual Store.

## Endpoints

### 1. Registro de Usuário

Registre um novo usuário e obtenha um token de acesso.

**URL:** `http://localhost:3001/user/signup`

**Método:** `POST`

**Parâmetros de Requisição:**

-   `name` (string): Nome do usuário.
-   `email` (string): Endereço de email do usuário.
-   `password` (string): Senha do usuário.
-   `confirmPassword` (string): Confirmação da senha do usuário.

**Exemplo de Requisição:**

```http
POST /user/signup HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
    "name": "SEU_NOME",
    "email": "SEU_EMAIL",
    "password": "SUA_SENHA",
    "confirmPassword": "SUA_CONFIRMAÇÃO"
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

**URL:** `http://localhost:3001/user/signin`

**Método:** `POST`

**Parâmetros de Requisição:**

-   `email` (string): Endereço de email registrado na conta do usuário.
-   `password` (string): Senha registrada na conta do usuário.

**Exemplo de Requisição:**

```http
POST /user/signin HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
    "email": "SEU_EMAIL",
    "password": "SUA_SENHA"
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

### 3. Deletar Usuário

Esta rota é responsável por permitir a remoção de um usuário existente no sistema. Ela oferece uma interface para solicitar a exclusão de um usuário por meio de uma requisição HTTP do tipo PATCH. A rota recebe como parâmetro um identificador único que identifica o usuário a ser excluído. Ao receber a solicitação, o sistema verifica a existência desse usuário e, se encontrado, procede com a exclusão do registro correspondente.

**URL:** `http://localhost:3001/user/deleteaccount/id`

**Método:** `PATCH`

**Parâmetros de Requisição:**

-   `id` (string): O identificador único do usuário a ser excluído.

**Exemplo de Requisição:**

```http
PATCH /user/deleteacconunt/123 HTTP/1.1
Host: localhost:3001
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": true,
    "message": "MENSAGEM_DE_SUCESSO"
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
