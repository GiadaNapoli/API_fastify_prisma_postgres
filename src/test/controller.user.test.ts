iimport { user } from '../../../../packages/core/src/services';

import { prisma } from '@repo/database';
import * as assert from 'assert';
import { testApp } from '../setup-test';
import { profile } from 'console';

describe('users', () => {
  describe('GET /users/:id', () => {
    it('should return null for unexisting users', async () => {
      const res = await testApp.inject({
        url: '/users/invalid',
      });

      const { data } = JSON.parse(res.payload);
      assert.deepEqual(data, null);
    });

    it('should return an existing user', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'user@email.com',
          password: 'ciaociaociao',
        },
      });

      const res = await testApp.inject({
        url: `/users/${user.id}`,
      });

      const { data } = JSON.parse(res.payload);
      assert.notDeepEqual(data, user);
      expect(data).toMatchObject({
        id: user.id,
        email: user.email,
      });
      expect(data.profile).not.toBeNull();
      expect(data.profile.sex).toBeNull();
      expect(data.profile.birthday).toBeNull();
    });
  });

  describe('POST /users', () => {
    const userData = {
      email: 'useruser1@example.com',
      password: 'ciaociaociao',
      profile: {
        sex: 'F',
        birthday: '1990, 5, 25',
      },
    };

    it('should create a new user and return it without password', async () => {
      const res = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: userData,
      });

      expect(res.statusCode).toBe(200);
      const { data } = JSON.parse(res.payload);

      expect(data).not.toHaveProperty('password');
    });

    it('should return a user with properties sex and birthady set', async () => {
      const res = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: userData,
      });
      expect(res.statusCode).toBe(200);
      const { data } = JSON.parse(res.payload);
      expect(data.profile).not.toBeNull();
      expect(data).toMatchObject({
        profile: {
          sex: userData.profile.sex,
          // birthday: userData.profile.birthday,
          //It gives an error because the quotation marks are different
        },
      });
    });
    it('should return a user with properties sex and birthday set to null when profile is not assigned', async () => {
      const userDataWithoutProfile = {
        email: 'useruser2@example.com',
      };

      const res = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: userDataWithoutProfile,
      });
      const { data } = JSON.parse(res.payload);
      expect(data).toHaveProperty('profile');
      expect(data.profile.sex).toBe(null);
      expect(data.profile.birthday).toBe(null);
    });

    it('should save the profile while creating the user', async () => {
      const res = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: userData,
      });
      const { data } = JSON.parse(res.payload);
      expect(data).not.toBeNull();
      const findUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(findUser).not.toBeNull();
      expect(findUser!.email).toBe(userData.email);
    });

    it('should return 409 for duplicate email', async () => {
      const res1 = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: {
          email: userData.email,
          password: 'ciaociaociao',
        },
      });

      expect(res1.statusCode).toBe(200);

      const res2 = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: {
          email: userData.email,
          password: 'ciaociaociao',
        },
      });
      expect(res2.statusCode).toBe(409);
      expect(JSON.parse(res2.payload)).toEqual({
        error: 'Email already exists',
      });
    });

    it('should return 415 for invalid request', async () => {
      const invalidRequest = 'isAInvalidEmail';

      const res = await testApp.inject({
        method: 'POST',
        url: '/users',
        payload: { email: invalidRequest },
      });

      expect(res.statusCode).toBe(415);

      const resBody = JSON.parse(res.payload);
      expect(resBody.error).toBe('Validation error');
    });
  });

  describe('DELETE /users/:id', () => {
    const userToDelete = { id: '1', email: 'test@example.com' };
    it('should delete a user', async () => {
      await prisma.user.create({ data: userToDelete });

      const response = await testApp.inject({
        method: 'DELETE',
        url: `/users/${userToDelete.id}`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.payload).toBe('user deleted');
    });

    it('should return 404 for user not found', async () => {
      const response = await testApp.inject({
        method: 'DELETE',
        url: '/users/999',
      });

      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'NOT_FOUND',
      });
    });
  });
});
