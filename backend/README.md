<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database Setup

Before running the application, you need to set up the database. See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

**Quick setup:**
```bash
cd backend
npm install
npm run db:setup  # Creates database and runs migrations automatically
```

**Manual setup:**
1. Install PostgreSQL
2. Create a database named `jobsync`
3. Configure environment variables in `.env`
4. Run `npm run db:setup`

## Updating Common Modules

### Quick Update Commands

```bash
# Update all dependencies
npm run update:all

# Update only common NestJS modules
npm run update:common

# Force update all dependencies (use with caution)
npm run update:deps
```

### What Gets Updated

- **NestJS Core**: `@nestjs/common`, `@nestjs/core`
- **GraphQL**: `@nestjs/graphql`, `@nestjs/apollo`, `graphql`
- **Database**: `@nestjs/typeorm`, `typeorm`, `pg`
- **Validation**: `class-validator`, `class-transformer`
- **TypeScript**: `typescript`, `@types/node`, `ts-node`

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Available Scripts

- **Start development**: `npm run start:dev`
- **Start production**: `npm run start:prod`
- **Build project**: `npm run build`
- **Format code**: `npm run format`
- **Lint code**: `npm run lint`
- **Setup database**: `npm run db:setup`
- **Reset database**: `npm run db:reset`
- **Update dependencies**: `npm run update:all`

## GraphQL Playground

Once the application is running, you can access the GraphQL Playground at:
http://localhost:3000/graphql

## Project Structure

```
src/
├── common/           # Shared utilities and decorators
├── entities/         # TypeORM entities
├── modules/          # Feature modules
├── resolvers/        # GraphQL resolvers
├── services/         # Business logic services
├── shared/           # Shared constants
├── types/            # GraphQL input types
├── app.module.ts     # Main application module
├── database-setup.ts # Database setup script
└── main.ts          # Application entry point
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
