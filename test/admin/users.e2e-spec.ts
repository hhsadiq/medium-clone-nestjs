import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '@test/utils/constants';
import { fakeGenerator } from '@test/utils/faker';
import request from 'supertest';

import { RoleEnum } from '@src/roles/roles.enum';
import { StatusEnum } from '@src/statuses/statuses.enum';

describe('Users Module', () => {
  const app = APP_URL;
  let apiToken: string;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  describe('Update', () => {
    let newUser;
    const newUserFirstName = fakeGenerator.generateFirstName();
    const newUserLastName = fakeGenerator.generateLastName();
    const newUserEmail = fakeGenerator.generateEmail();
    const newUserPassword = fakeGenerator.generatePassword();
    const username = `user${newUserFirstName}`;
    const newUserChangedEmail = fakeGenerator.generateEmail();
    const newUserChangedPassword = fakeGenerator.generatePassword();

    beforeAll(async () => {
      await request(app).post('/api/v1/auth/email/register').send({
        email: newUserEmail,
        password: newUserPassword,
        firstName: newUserFirstName,
        lastName: newUserLastName,
        username,
      });

      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => {
          newUser = body.user;
        });
    });

    describe('User with "Admin" role', () => {
      it('should change password for existing user: /api/v1/users/:id (PATCH)', () => {
        return request(app)
          .patch(`/api/v1/users/${newUser.id}`)
          .auth(apiToken, {
            type: 'bearer',
          })
          .send({
            email: newUserChangedEmail,
            password: newUserChangedPassword,
          })
          .expect(200);
      });

      describe('Guest', () => {
        it('should login with changed password: /api/v1/auth/email/login (POST)', () => {
          return request(app)
            .post('/api/v1/auth/email/login')
            .send({
              email: newUserChangedEmail,
              password: newUserChangedPassword,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.token).toBeDefined();
            });
        });
      });
    });
  });

  describe('Create', () => {
    const newUserByAdminEmail = fakeGenerator.generateEmail();
    const newUserByAdminPassword = fakeGenerator.generatePassword();

    describe('User with "Admin" role', () => {
      it('should fail to create new user with invalid email: /api/v1/users (POST)', () => {
        return request(app)
          .post(`/api/v1/users`)
          .auth(apiToken, {
            type: 'bearer',
          })
          .send({ email: 'fail-data' })
          .expect(422);
      });

      it('should successfully create new user: /api/v1/users (POST)', () => {
        return request(app)
          .post(`/api/v1/users`)
          .auth(apiToken, {
            type: 'bearer',
          })
          .send({
            email: newUserByAdminEmail,
            password: newUserByAdminPassword,
            firstName: `UserByAdmin${fakeGenerator.generateFirstName()}`,
            username: `User${Date.now()}`,
            lastName: fakeGenerator.generateLastName(),
            role: {
              id: RoleEnum.user,
            },
            status: {
              id: StatusEnum.inactive,
            },
          })
          .expect(201);
      });

      describe('Guest', () => {
        it('should successfully login via created by admin user: /api/v1/auth/email/login (GET)', () => {
          return request(app)
            .post('/api/v1/auth/email/login')
            .send({
              email: newUserByAdminEmail,
              password: newUserByAdminPassword,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.token).toBeDefined();
            });
        });
      });
    });
  });

  describe('Get many', () => {
    describe('User with "Admin" role', () => {
      it('should get list of users: /api/v1/users (GET)', () => {
        return request(app)
          .get(`/api/v1/users`)
          .auth(apiToken, {
            type: 'bearer',
          })
          .expect(200)
          .send()
          .expect(({ body }) => {
            expect(body.data[0].provider).toBeDefined();
            expect(body.data[0].email).toBeDefined();
            expect(body.data[0].hash).not.toBeDefined();
            expect(body.data[0].password).not.toBeDefined();
            expect(body.data[0].previousPassword).not.toBeDefined();
          });
      });
    });
  });
});
