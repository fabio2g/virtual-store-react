# Login de Usuário

Bem-vindo à documentação da API Virtual Store React. Esta API permite aos desenvolvedores integrar a funcionalidade de autenticação e login de usuário em suas aplicações. Abaixo, você encontrará informações detalhadas sobre como utilizar os endpoints da API de forma eficaz.

**Endpoint Base**: `http://localhost:3000`

## Autenticação

Para utilizar os endpoints da API, você precisará incluir um token de autenticação no cabeçalho de suas requisições. O token pode ser obtido através do processo de registro e autenticação com as credenciais da sua aplicação.

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

### 2. Obter Dados do Usuário Autenticado

Recupera informações do usuário autenticado usando o token de acesso.

**URL**: `/perfil`

**Método**: `GET`

**Exemplo de Requisição:**

```http
GET /perfil HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer SEU_TOKEN_DE_ACESSO
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nome": "Usuário Exemplo",
  "email": "usuario@example.com"
  // Outros campos de perfil
}
```

### 3. Encerrar Sessão

Revoga o token de acesso, efetuando o logout do usuário.

**URL**: `/logout`

**Método**: `POST`

**Exemplo de Requisição:**

```http
POST /logout HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer SEU_TOKEN_DE_ACESSO
```

**Resposta Bem-Sucedida:**

```json
HTTP/1.1 204 No Content
```

## Status de Erro

A API retornará os seguintes códigos de status em caso de erro:

-   `400 Bad Request`: Requisição mal formada ou parâmetros ausentes.
-   `401 Unauthorized`: Falha na autenticação.
-   `403 Forbidden`: Acesso negado devido a permissões insuficientes.
-   `500 Internal Server Error`: Erro interno do servidor.

Para cada resposta de erro, um objeto JSON detalhando o erro será retornado, contendo uma mensagem descritiva do problema.

---

Esta é uma documentação básica para a API de Login de Usuário. Certifique-se de substituir os exemplos acima pelos detalhes específicos da sua API.
