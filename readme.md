<div
  class="container"
  align="center"
>
 <img src="https://ik.imagekit.io/lespresources/ticket.png" style="height:5rem"/>

# Book My ticket

</div>

<p align="center">
<a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
<a href="#"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"></a>
<a href="#"><img src="https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle"></a>
<a href="#"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"></a>
<a href="#"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
<a href="#"><img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"></a>
<a href="#"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"></a>
<a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
<a href="#"><img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=mailgun&logoColor=white" alt="Resend"></a>
<a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm"></a>

# Book My ticket

A ticket booking API built with TypeScript, Express, and PostgreSQL, implementing JWT authentication, refresh tokens, email verification, secure cookie-based auth, and ticket management.

## Prerequisites

- Node.js
- Docker and Docker Compose
- pnpm/npm/yarn/bun

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sagarkemble/Book-My-Ticket
cd Book-My-Ticket
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the variables as shown in the `.env.example` file

**Important**: Replace the JWT secrets with strong strings in production.

### 4. Start PostgreSQL with Docker

Start the PostgreSQL container:

```bash
npm run db:up
```

This will start PostgreSQL on `localhost:5432` with the credentials specified in your `.env` file.

To stop the database:

```bash
npm run db:down
```

### 5. Run database migrations

```bash
npm run db:generate
npm run db:migrate
```

### 6. Start the development server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT you specified in `.env`).

## API Endpoints

### Authentication Routes

All routes are prefixed with `/auth`

#### Register a new user ` /auth/register`

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "John Doe"
}
```

#### Verify email `/auth/verify-mail`

```http
POST /auth/verify-mail
Content-Type: application/json

{
  "token": "verification_token_from_email"
}
```

#### Login `/auth/login`

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Refresh access token `/auth/refresh-access-token`

```http
POST /auth/refresh-access-token
Cookie: refreshToken=<refresh_token>
```

#### Logout (Protected) `/auth/logout`

```http
POST /auth/logout
Cookie: accessToken=<access_token>
```

### Ticket Routes

All routes are prefixed with `/tickets`

#### Book a ticket (Protected) `/tickets/book`

```http
PUT /tickets/book
Cookie: accessToken=<access_token>
Content-Type: application/json

{
  "seatNo": 42
}
```

#### Get booked tickets `/tickets/booked`

```http
GET /tickets/booked
```

#### Get unbooked tickets `/tickets/unbooked`

```http
GET /tickets/unbooked
```

#### Get all tickets `/tickets/all`

```http
GET /tickets/all
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run db:up` - Start PostgreSQL Docker container
- `npm run db:down` - Stop PostgreSQL Docker container
- `npm run db:generate` - Generate database schema changes
- `npm run db:migrate` - Push database schema changes to PostgreSQL
