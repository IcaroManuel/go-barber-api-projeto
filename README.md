<div align="center">
  <h1>💈 GoBarber API</h1>
  <p>
    <strong>Backend completo para gerenciamento de barbearias e agendamentos</strong>
  </p>
  
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/IcaroManuel/go-barber-api-projeto?color=%23FF9000">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/IcaroManuel/go-barber-api-projeto?color=%23FF9000">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23FF9000">
  </p>
</div>

---

## 📋 Sobre o Projeto

O **GoBarber API** é uma aplicação backend robusta e escalável desenvolvida para gerenciar barbearias, prestadores de serviços e agendamentos. A aplicação oferece uma solução completa para conectar clientes e barbeiros, permitindo agendamentos, notificações, gestão de perfis e muito mais.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação e Autorização** - Sistema completo com JWT
- 👤 **Gestão de Usuários** - Cadastro, atualização de perfil e avatar
- 📅 **Sistema de Agendamentos** - Criação e listagem de appointments
- 🔔 **Notificações** - Sistema de notificações em tempo real com MongoDB
- 📧 **Recuperação de Senha** - Envio de emails para reset de senha
- ⚡ **Cache Redis** - Performance otimizada com cache de dados
- 🚀 **Rate Limiting** - Proteção contra ataques DDoS
- 📦 **Upload de Arquivos** - Sistema de upload e gerenciamento de avatares
- 🎯 **Disponibilidade de Horários** - Verificação de horários disponíveis por dia/mês

---

## 🛠️ Tecnologias Utilizadas

### Core

- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Express](https://expressjs.com/)** - Framework web minimalista

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional principal
- **[MongoDB](https://www.mongodb.com/)** - Banco NoSQL para notificações
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[Redis](https://redis.io/)** - Cache em memória para alta performance

### Segurança e Autenticação

- **[JWT (jsonwebtoken)](https://jwt.io/)** - Autenticação baseada em tokens
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[Celebrate](https://github.com/arb/celebrate)** - Validação de dados com Joi

### Desenvolvimento

- **[Jest](https://jestjs.io/)** - Framework de testes
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)** - Hot reload durante desenvolvimento

### Infraestrutura

- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers

### Outras Bibliotecas

- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[Multer](https://www.npmjs.com/package/multer)** - Upload de arquivos
- **[Nodemailer](https://nodemailer.com/)** - Envio de emails
- **[Handlebars](https://handlebarsjs.com/)** - Templates de email
- **[TSyringe](https://github.com/microsoft/tsyringe)** - Injeção de dependências
- **[rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible)** - Rate limiting

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**, utilizando:

- 📁 **Domain-Driven Design (DDD)** - Organização por domínios de negócio
- 🔄 **Dependency Inversion** - Inversão de dependências com interfaces
- 🧪 **Test-Driven Development (TDD)** - Desenvolvimento orientado a testes
- 🎯 **Repository Pattern** - Camada de abstração para persistência
- 💉 **Dependency Injection** - Gerenciamento de dependências com TSyringe
- 🎭 **Service Layer** - Lógica de negócio isolada

### Estrutura de Pastas

```
src/
├── @types/          # Definições de tipos TypeScript
├── config/          # Configurações da aplicação
├── modules/         # Módulos de domínio (DDD)
│   ├── appointments/
│   ├── notifications/
│   └── users/
└── shared/          # Recursos compartilhados
    ├── container/   # Injeção de dependências
    ├── errors/      # Tratamento de erros
    └── infra/       # Camada de infraestrutura
        ├── http/    # Rotas e middlewares
        └── typeorm/ # Configuração do banco
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/IcaroManuel/go-barber-api-projeto.git
cd go-barber-api-projeto
```

2. **Instale as dependências**

```bash
yarn install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Application
PORT=3333
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5434
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=gobarberapi

# MongoDB
MONGO_URL=mongodb://root:example@localhost:27017/gobarber11?authSource=admin

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES_IN=1d

# Mail
MAIL_DRIVER=ethereal # ou smtp
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=

# Storage
STORAGE_DRIVER=disk # ou s3
```

4. **Suba os containers Docker**

```bash
docker-compose up -d
```

5. **Execute as migrations**

```bash
yarn typeorm migration:run
# ou
npm run typeorm migration:run
```

6. **Inicie o servidor**

```bash
yarn start
# ou
npm start
```

O servidor estará rodando em `http://localhost:3333` 🎉

---

## 🧪 Testes

O projeto possui testes unitários e de integração utilizando Jest.

```bash
# Executar todos os testes
yarn test

# Executar testes em modo watch
yarn test --watch

# Gerar relatório de cobertura
yarn test --coverage
```

---

## 📚 Documentação da API

### Autenticação

#### POST `/sessions`

Autenticar usuário

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Usuários

#### POST `/users`

Criar novo usuário

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### PATCH `/users/avatar`

Atualizar avatar (multipart/form-data)

#### GET `/profile`

Buscar perfil do usuário autenticado

#### PUT `/profile`

Atualizar perfil

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "old_password": "123456",
  "password": "newpassword",
  "password_confirmation": "newpassword"
}
```

### Recuperação de Senha

#### POST `/password/forgot`

Solicitar reset de senha

```json
{
  "email": "user@example.com"
}
```

#### POST `/password/reset`

Resetar senha

```json
{
  "token": "token-recebido-por-email",
  "password": "newpassword",
  "password_confirmation": "newpassword"
}
```

### Agendamentos

#### POST `/appointments`

Criar agendamento

```json
{
  "provider_id": "uuid-do-prestador",
  "date": "2025-11-10T14:00:00"
}
```

#### GET `/appointments/me`

Listar agendamentos do prestador autenticado

Query params: `day`, `month`, `year`

### Prestadores

#### GET `/providers`

Listar todos os prestadores

#### GET `/providers/:provider_id/month-availability`

Disponibilidade mensal do prestador

Query params: `month`, `year`

#### GET `/providers/:provider_id/day-availability`

Disponibilidade diária do prestador

Query params: `day`, `month`, `year`

> 💡 **Dica**: Importe o arquivo `Insomnia/Insomnia_2022-11-16.json` no Insomnia para ter acesso a todas as rotas configuradas.

---

## 🗃️ Banco de Dados

### PostgreSQL

Armazena dados principais:

- Usuários
- Agendamentos (appointments)
- Tokens de recuperação de senha

### MongoDB

Utilizado para:

- Notificações em tempo real

### Redis

Implementado para:

- Cache de listagem de prestadores
- Cache de disponibilidade
- Rate limiting

---

## 🔒 Segurança

- ✅ Senhas criptografadas com bcryptjs
- ✅ Autenticação JWT
- ✅ Rate limiting para prevenir ataques
- ✅ Validação de dados de entrada com Celebrate/Joi
- ✅ CORS habilitado
- ✅ Tratamento global de erros
- ✅ Proteção contra SQL Injection (TypeORM)

---

## 🎯 Padrões de Código

### Code Style

- ESLint com configurações do Airbnb
- Prettier para formatação consistente
- Commits semânticos

### Boas Práticas

- Princípios SOLID
- Injeção de dependências
- Testes automatizados
- Separação de responsabilidades
- Interfaces e abstrações

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/IcaroManuel">
        <img src="https://github.com/IcaroManuel.png" width="100px;" alt="Foto do Ícaro"/>
        <br />
        <sub><b>Ícaro Manuel</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 🙏 Agradecimentos

- Comunidade Node.js e TypeScript
- Todos os contribuidores do projeto
- Desenvolvedores das bibliotecas utilizadas

---

<div align="center">
  <p>Desenvolvido com 💜 por <a href="https://github.com/IcaroManuel">Ícaro Manuel</a></p>
  
  ⭐ Deixe uma estrela se este projeto te ajudou!
</div>
