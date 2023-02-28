import accountMembersController from '../../src/routes/accountMembers/controller';

import AccountModel from '../../src/models/Account';
import UserModel from '../../src/models/User';
import OperationHistoryModel from '../../src/models/OperationHistory';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('../../src/models/Account', () => ({
  findById: jest.fn(),
  findOne: jest.fn(),
  //   save: jest.fn(),
}));
jest.mock('../../src/models/User', () => ({ findById: jest.fn() }));
jest.mock('../../src/models/OperationHistory', () => ({ create: jest.fn() }));

const { res: mockRes } = getMockRes();

describe('AccountMembers Controller', () => {
  test('When member info is valid, expect reponse to be successful', async () => {
    // ARRANGE
    const accountId = 'accountId';
    const userId = 'userId';
    const mockReq = getMockReq({
      body: {
        startDate: '2023-02-28T00:56:26.991Z',
        endDate: '2025-02-28T00:56:26.991Z',
        userId,
      },
      params: { accountId },
    });

    AccountModel.findById.mockResolvedValueOnce({
      _id: accountId,
      id: accountId,
      members: [],
      save: jest.fn().mockResolvedValueOnce({ id: accountId, _id: accountId }),
    });
    AccountModel.findOne.mockResolvedValueOnce(null);
    UserModel.findById.mockResolvedValueOnce({ _id: userId, id: userId });
    OperationHistoryModel.create.mockResolvedValueOnce({});

    const expectedResponse = {
      statusCode: 201,
      message: 'Created',
      payload: {
        _id: accountId,
      },
    };

    // ACT
    const response = await accountMembersController.create(mockReq, mockRes);

    //ASSERT
    expect(response).toMatchObject(expectedResponse);
  });
});
