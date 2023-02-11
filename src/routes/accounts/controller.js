import httpResponseHandler from '../../commons/httpResponseHandler';
import AccountModel from '../../models/Account';
import UserModel from '../../models/User';

import { handleAsync } from '../../commons/validator';
import { createAccountValidator } from '../../validators/accounts';

import AccountMembersService from '../../services/accountMembersService';

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
    const newAccount = await (
      await new AccountModel(accountDB).save()
    ).populate();
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
