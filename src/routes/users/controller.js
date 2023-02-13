import httpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';

import passwordServiceFactory from '../../services/password/passwordServiceFactory';
import signupServiceFactory from '../../services/signup/signupServiceFactory';

import Joi from 'joi';
import { handleAsync } from '../../commons/validator';
import updateUserValidatorFactory from '../../validators/users/update/validatorFactory';

export const create = async (req) => {
  try {
    const { role: userType } = req.body;
    const passwordService = passwordServiceFactory.createService(userType);
    const signupService = signupServiceFactory.createService(
      userType,
      UserModel,
      httpResponseHandler,
      passwordService
    );
    const response = await signupService.signup(req.body);

    // TODO: implement logger
    console.log(response);
    return response;
  } catch (error) {
    // TODO: implement logger
    console.log('Server error');
    console.log(error.stack);
    return httpResponseHandler.serverError(error.message);
  }
};

export const update = async (req) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    // validate params (userId)
    const paramsValidation = await handleAsync([
      Joi.string().required().validateAsync(userId),
    ]);
    if (!paramsValidation.valid) {
      // TODO: implement logger
      console.log('Params are invalid');
      return httpResponseHandler.badRequest(paramsValidation.stringError);
    }

    // Verify user exist on DB
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      // TODO: implement logger
      console.log('Target user does not exist on DB');
      return httpResponseHandler.notFound('Target user cannot be found on DB.');
    }

    // create user validator considering his role
    const updateUserValidator = updateUserValidatorFactory.createValidator(
      foundUser.role
    );
    const validation = await handleAsync([
      updateUserValidator.validateAsync(body),
    ]);
    if (!validation.valid) {
      // TODO: implement logger
      console.log('Validation errors on request body');
      return httpResponseHandler.badRequest(validation.stringError);
    }

    // Update user info
    const updateUser = await UserModel.findByIdAndUpdate(userId, body);
    if (!updateUser) {
      // TODO: implement logger
      console.log('User cannot be updated');
      return httpResponseHandler.unprocessableEntity(
        'User cannot be updated, please try again later.'
      );
    }

    return httpResponseHandler.ok(updateUser);
  } catch (error) {
    // TODO: implement logger
    console.log('Server error');
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { create, update };
