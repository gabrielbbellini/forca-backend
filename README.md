# Jogo da Forca - API com AdonisJS e ReactTS

Este é o backend de um jogo da forca desenvolvido utilizando **AdonisJS** no backend com **PostgreSQL** como banco de dados e **ReactTS** no frontend. O objetivo é criar um jogo da forca onde o jogador pode adivinhar letras de uma palavra aleatória, com integração entre o backend e o frontend.

## Tecnologias Utilizadas

- **AdonisJS** (Backend)
- **PostgreSQL** (Banco de dados)
- **ReactTS** (Frontend)
- **Node.js** (Ambiente de execução)

## Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (instalado e configurado)

## Passos para Configuração

Siga as etapas abaixo para configurar o projeto localmente:


### 1. Clonar o Repositório

Primeiro, clone este repositório em sua máquina local:

```bash
git clone https://github.com/gabrielbbellini/forca-backend.git
cd forca-backend
```


### 2. Instalar Dependências
Execute o comando abaixo para instalar todas as dependências do projeto:

```bash
npm install
```


### 3. Configurar o Banco de Dados
Certifique-se de que o PostgreSQL esteja rodando e que o banco de dados necessário tenha sido criado. Siga as etapas abaixo:

Criar o Banco de Dados:

Certifique-se de que você tenha criado um banco de dados chamado forca. Você pode fazer isso no PostgreSQL com o seguinte comando:

```sql
CREATE DATABASE forca_db;
```
Credenciais do PostgreSQL: Verifique se o usuário postgres e a senha root estão configurados no PostgreSQL ou ajuste as credenciais no arquivo .env.


### 4. Configurar o Arquivo .env
Crie um arquivo .env na raiz do projeto e adicione as seguintes configurações (ajuste as credenciais conforme necessário):

```bash
APP_KEY=J2kF1Un3JhH8DkV7PwQ8Tl9XsZ0RbH5A
NODE_ENV=development
HOST=127.0.0.1
PORT=3333
DRIVE_DISK=local
SESSION_DRIVER=cookie

DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_DATABASE=forca_db
LOG_LEVEL=debug
CACHE_VIEWS=false
```
Gerar APP_KEY
Caso ainda não tenha uma APP_KEY, gere uma com o seguinte comando:

```bash
node ace generate:key
```


### 5. Rodar as Migrações
Depois de configurar o banco de dados e o arquivo .env, você precisará rodar as migrações para configurar as tabelas no banco de dados:

```bash
node ace migration:run
```


### 6. Executar o Servidor de Desenvolvimento

Agora, você pode rodar o servidor do AdonisJS com o seguinte comando:

```bash
npm run dev
```

O backend estará disponível em http://127.0.0.1:3333.


### Endpoints da API

#### Criar um novo jogo
```bash
URL: /word
Método: POST
Descrição: Cria um novo jogo com uma palavra aleatória.
```

#### Carregar um jogo existente
```bash
URL: /word/:uuid
Método: GET
Descrição: Carrega um jogo existente.
```

#### Advinhar uma letra
```bash
URL: /word/:uuid/character
Método: POST
Descrição: Adiciona uma tentativa de adivinhação no jogo atual.
```
