import accountsController from '../../src/routes/accounts/controller';
import AccountModel from '../../src/models/Account';
import UserModel from '../../src/models/User';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('../../src/models/Account', () => ({ paginate: jest.fn() }));
jest.mock('../../src/models/User', () => ({ paginate: jest.fn() }));

const { res: mockRes } = getMockRes();

describe('AccountsController Get', () => {
  test('When parameters are valid, expect response to be successful', async () => {
    // Arrange
    const mockReq = getMockReq({});

    const mockAccounts = { docs: [] };
    AccountModel.paginate.mockResolvedValue(mockAccounts);

    // Act
    const response = await accountsController.get(mockReq, mockRes);

    // Assert
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('message', 'Success');
    expect(response).not.toHaveProperty('error');
  });
});
