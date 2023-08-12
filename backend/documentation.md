**Cabeçalhos Requeridos:**

```
Authorization: Bearer SEU_TOKEN_DE_AUTENTICAÇÃO
```

## Endpoints

### 1. Registro de Usuário

Registra um usuário, fornecendo um token de acesso para uso futuro.

**URL**: `/user/signup`

**Método**: `POST`

**Parâmetros de Requisição:**

-   `name` (string): O nome do usuário.
-   `email` (string): O email do usuário.
-   `password` (string): A senha do usuário.
-   `confirmPasswrod` (string): A confirmaçãode de senha do usuário.

**Exemplo de Requisição:**

```http
POST /login HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@exemple.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "mensagem": "Autenticação bem-sucedida",
  "token_de_acesso": "SEU_TOKEN_DE_ACESSO"
}
```
