import authController from '../../src/routes/auth/controller';
import jsonwebtoken from 'jsonwebtoken';
import UserModel from '../../src/models/User';
import passwordServiceFactory from '../../src/services/password/passwordServiceFactory';
import { getMockReq } from '@jest-mock/express';

jest.mock('jsonwebtoken');
jest.mock('../../src/models/User', () => ({ findOne: jest.fn() }));
jest.mock('../../src/services/password/passwordServiceFactory');

describe('AuthController login', () => {
  test('When credentials are valid, expect response to be successful', async () => {
    // Arrange
    const role = 'admin';
    const credentials = {
      email: 'jhon.doe@mailinator.com',
      password: 'abc123!',
    };
    const accessToken = 'asdfqwerty';
    const expectedResponse = {
      statusCode: 200,
      message: 'Success',
      payload: { accessToken },
    };
    const req = getMockReq({
      body: credentials,
    });

    UserModel.findOne.mockResolvedValue({ role });
    passwordServiceFactory.createService.mockReturnValue({
      verify: async () => true,
    });
    jsonwebtoken.sign.mockReturnValue(accessToken);

    // Act
    const response = await authController.login(req);

    expect(response).toMatchObject(expectedResponse);
  });
});
