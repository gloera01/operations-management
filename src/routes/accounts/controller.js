import httpResponseHandler from '../../commons/httpResponseHandler';
import AccountModel from '../../models/Account';

import { handleAsync } from '../../commons/validator';
import { createAccountValidator } from '../../validators/accounts';

export const create = async (req) => {
  try {
    // validate input body
    // verify an account with the same name does not exist
    // TODO:
    // handle team members
    // members are optional
    // if provided, add on history they were added

    const accountDTO = { ...req.body };
    const newAccount = await new AccountModel(accountDTO).save();
    return httpResponseHandler.created(
      newAccount,
      'Account created successfully'
    );
  } catch (error) {
    // TODO: implement logger
    console.log('Server error');
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { create };
