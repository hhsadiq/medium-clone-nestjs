# Medium backend clone

Implementing the [Realworld Medium Clone Specifications](https://realworld-docs.netlify.app/docs/implementation-creation/features) using TypeORM/Postgres and Hexagonal Architecture.

## Documentation <!-- omit in toc -->

[Full documentation here](/docs/readme.md)

## Roadmap

1. **Add Clap Feature for Articles**

   - **Database**: Add a `clap` table with the following columns: `id`, `article_id` (foreign key), `user_id` (foreign key), and `counter`, with a composite primary key on `article_id` and `user_id`.
   - **API to Clap an Article**: Create an API endpoint that allows users to clap for an article. Each clap will increment the counter associated with the user and article.
   - **Get Articles API Update**: Modify the existing "get articles" API to include the total clap count for each article, aggregating claps from all users.

2. **Add Unit Testing and E2E Testing**
   - Implement comprehensive unit and e2e tests to ensure code quality and functionality. Leverage Hygen templates to automate the creation of test files where possible, streamlining the testing process.

## Features

- [x] This project is using [TypeORM](https://www.npmjs.com/package/typeorm) along with [PostgreSQL](https://www.postgresql.org/).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] Support E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).
