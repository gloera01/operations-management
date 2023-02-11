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

    // TODO:
    // verify operationsManager exists
    const opManager = await UserModel.findById(body.operationsManager);
    if (!opManager) {
      // TODO: implement logger
      console.log('Operations manager does not exist');
      return httpResponseHandler.badRequest(
        'Invalid operations manager, cannot be found'
      );
    }

    // handle team members
    const teamMembersService = new AccountMembersService();
    const teamMembers = teamMembersService.mapIntoDBMembers(req.body.members);

    // input for DB collection
    const accountDB = {
      name: body.name,
      client: body.client,
      operationsManager: body.operationsManager,
      members: teamMembers,
    };

    // save account in DB
    const newAccount = await new AccountModel(accountDB).save();
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
