import usersController from '../../src/routes/users/controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import signupServiceFactory from '../../src/services/signup/signupServiceFactory';

jest.mock('../../src/services/signup/signupServiceFactory');

const { res: mockRes } = getMockRes();

describe('UsersController create', () => {
  test('When params are valid, expect login to be successful', async () => {
    // Arrange
    const userData = {
      name: 'Jhon doe',
      email: 'jhon.doe01@mailinator.com',
      password: 'Password1!',
      role: 'bro',
    };
    const expectedResponse = {
      statusCode: 201,
      message: 'User created successfully',
      payload: userData,
    };
    const req = getMockReq({
      body: userData,
    });
    const mockService = { signup: () => expectedResponse };
    signupServiceFactory.createService.mockReturnValue(mockService);

    // Act
    const loginResponse = await usersController.create(req, mockRes);

    // Assert
    expect(loginResponse).toMatchObject(expectedResponse);
  });
});
