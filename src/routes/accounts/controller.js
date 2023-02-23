import httpResponseHandler from '../../commons/httpResponseHandler';
import AccountModel from '../../models/Account';
import UserModel from '../../models/User';
import OperationHistoryModel from '../../models/OperationHistory';

import { handleAsync } from '../../commons/validator';
import { createAccountValidator } from '../../validators/accounts';

import AccountMembersService from '../../services/accountMembersService';

import { ADDED } from '../../constants/accountTeamMemberActions';

export const create = async (req) => {
  try {
    const { body } = req;
    // validate input body
    const validation = await handleAsync([
      createAccountValidator.validateAsync(body),
    ]);
    if (!validation.valid) {
      // TODO: implement logger
      console.log('Validation errors');
      console.log(validation.stringError);
      return httpResponseHandler.badRequest(validation.stringError);
    }

    // verify an account with the same name does not exist
    const foundAccount = await AccountModel.findOne({ name: body.name });
    if (foundAccount) {
      // TODO: implement logger
      console.log('Account already exists');
      return httpResponseHandler.conflict('An account name is already in use.');
    }

    // verify operations manager exists
    const opManager = await UserModel.findById(body.operationsManager);
    if (!opManager) {
      // TODO: implement logger
      console.log('Operations manager does not exist');
      return httpResponseHandler.badRequest(
        'Invalid OperationsManager, cannot be found on DB'
      );
    }

    const teamMembersService = new AccountMembersService(UserModel);

    // verify incoming members are existing DB users
    const allMembersExistOnDB = await teamMembersService.verifyExist(
      body.members
    );
    if (allMembersExistOnDB.notFound.length) {
      // TODO: implement logger
      console.log('There are some team members which are not valid');
      return httpResponseHandler.badRequest(
        `Those team members were not found on DB, ${JSON.stringify(
          allMembersExistOnDB.notFound
        )}`
      );
    }

    // handle team members
    const dbMembers = teamMembersService.mapIntoDBMembers(body.members);

    // input for DB collection
    const accountDB = {
      name: body.name,
      client: body.client,
      operationsManager: body.operationsManager,
      members: dbMembers,
    };

    // save account in DB
    let newAccount = new AccountModel(accountDB);

    // include operations manager user data and team members data
    await Promise.all([
      newAccount.populate({
        path: 'operationsManager',
        select: ['name', 'email'],
      }),
      newAccount.populate({
        path: 'members.user',
        select: ['name', 'email'],
      }),
    ]);

    newAccount = await newAccount.save();

    if (!newAccount) {
      // TODO: implement logger
      console.log('Account cannot be created on DB.');
      return httpResponseHandler.unprocessableEntity(
        'Account cannot be created, please retry later.'
      );
    }

    // save members on history logs
    if (body.members?.length) {
      // TODO: implement logger
      console.log('Save members operations');
      // prepare history log for each team member
      const records = body.members.map((tm) => ({
        account: newAccount._id,
        details: ADDED,
        member: {
          user: tm.userId,
          assignation: { startDate: tm.startDate, endDate: tm.endDate },
        },
      }));
      await OperationHistoryModel.insertMany(records);
    }

    const response = httpResponseHandler.created(
      newAccount,
      'Account created successfully'
    );

    // TODO: implement logger
    console.log(response);
    return response;
  } catch (error) {
    // TODO: implement logger
    console.log('Server error');
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { create };
