import httpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';
import AccountModel from '../../models/Account';
import OperationHistoryModel from '../../models/OperationHistory';

import Joi from 'joi';
import { handleAsync } from '../../commons/validator';
import { createMemberValidator } from '../../validators/accountMembers';
import { ADDED } from '../../constants/accountTeamMemberActions';

export const get = async (req) => {};

export const create = async (req) => {
  try {
    const { accountId } = req.params;
    const { body } = req;
    const validation = await handleAsync([
      Joi.string().required().validateAsync(accountId),
      createMemberValidator.validateAsync(body),
    ]);
    if (!validation.valid) {
      // TODO: implement logger
      console.log('Validation errors');
      return httpResponseHandler.badRequest(validation.stringError);
    }

    // search target account
    const targetAccount = await AccountModel.findById(accountId);
    if (!targetAccount) {
      // TODO: implement logger
      console.log('Target account was not found');
      return httpResponseHandler.notFound('Account not found.');
    }

    // verify new member is a registered user
    const { userId } = body;
    const user = await UserModel.findById(userId);
    if (!user) {
      // TODO: implement logger
      console.log('Incoming member is not a registered user.');
      return httpResponseHandler.badRequest(
        'Team member cannot be found on DB'
      );
    }

    // verify team member is not already a member
    const foundByMember = await AccountModel.findOne({
      id: accountId,
      'members.user': userId,
    });
    if (foundByMember) {
      // TODO: implement logger
      console.log(`Member with id: ${userId} is already a member`);
      return httpResponseHandler.conflict('Already a member');
    }

    // add new team member
    const accountMember = {
      assignation: { startDate: body.startDate, endDate: body.endDate },
      user: body.userId,
    };
    targetAccount.members.push(accountMember);
    const saveResponse = await targetAccount.save();

    // save operation on history
    await OperationHistoryModel.create({
      account: saveResponse.id,
      details: ADDED,
      member: accountMember,
    });

    // TODO: implement logger
    console.log(saveResponse);
    return httpResponseHandler.created(saveResponse);
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { get, create };
