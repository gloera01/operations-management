import httpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';
import AccountModel from '../../models/Account';
import OperationHistoryModel from '../../models/OperationHistory';

import Joi from 'joi';
import { handleAsync } from '../../commons/validator';
import { createMemberValidator } from '../../validators/accountMembers';
import { ADDED, REMOVED } from '../../constants/accountTeamMemberActions';

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
    let targetAccount = await AccountModel.findById(accountId);
    if (!targetAccount) {
      // TODO: implement logger
      console.log('Target account was not found');
      return httpResponseHandler.notFound('Account not found.');
    }

    // verify new member is a registered user
    const { userId } = body;
    const registeredUser = await UserModel.findById(userId);
    if (!registeredUser) {
      // TODO: implement logger
      console.log('Incoming member is not a registered user.');
      return httpResponseHandler.badRequest(
        'Team member cannot be found on DB'
      );
    }

    // verify team member does not belong to the team yet
    const accountMember = await AccountModel.findOne({
      id: accountId,
      'members.user': userId,
    });
    if (accountMember) {
      // TODO: implement logger
      console.log(`Member with id: ${userId} is already a member`);
      return httpResponseHandler.conflict('Already a member');
    }

    // add new team member
    targetAccount.members.push({
      assignation: { startDate: body.startDate, endDate: body.endDate },
      user: body.userId,
    });
    targetAccount = await targetAccount.save();

    // save operation on history
    await OperationHistoryModel.create({
      account: { client: targetAccount.client, name: targetAccount.name },
      details: ADDED,
      user: {
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    });

    // TODO: implement logger
    console.log(targetAccount);
    return httpResponseHandler.created(targetAccount);
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export const remove = async (req) => {
  try {
    const { accountId, userId } = req.params;
    // Inpunts Validation
    const validation = await handleAsync([
      Joi.string().label('accountId').required().validateAsync(accountId),
      Joi.string().label('userId').required().validateAsync(userId),
    ]);
    if (!validation.valid) {
      // TODO: implement logger
      console.log('Validation errors');
      httpResponseHandler.badRequest(validation.stringError);
    }

    // verify account exist
    const targetAccount = await AccountModel.findById(accountId);
    if (!targetAccount) {
      // TODO: implement logger
      console.log('Account was not found');
      return httpResponseHandler.badRequest('Target account was not found');
    }

    // verify target member belongs on target account
    const targetMember = targetAccount.members.find(
      (m) => m.user?.toString() === userId
    );
    if (!targetMember) {
      // TODO: implement logger
      console.log('Target member is not found');
      return httpResponseHandler.notFound('Target member was not found.');
    }

    // Remove member from account
    targetAccount.members = targetAccount.members.filter(
      (mm) => mm.user?.toString() !== userId
    );
    await targetAccount.save();

    // Save operation on history
    const userInfo = await UserModel.findById(userId);

    await OperationHistoryModel.create({
      details: REMOVED,
      account: { client: targetAccount.client, name: targetAccount.name },
      user: {
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role,
        startDate: targetMember.assignation.startDate,
        endDate: targetMember.assignation.endDate,
      },
    });
    return httpResponseHandler.ok(targetMember);
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { get, create, remove };
