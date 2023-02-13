import httpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';
import passwordServiceFactory from '../../services/password/passwordServiceFactory';
import signupServiceFactory from '../../services/signup/signupServiceFactory';

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

    // TODO:
    // validate userId

    // Verify user exist on DB
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      // TODO: implement logger
      console.log('Target user does not exist on DB');
      return httpResponseHandler.notFound('Target user cannot be found on DB.');
    }

    // TODO:
    // updateUserValidatorFactory.create(foundUser.role);

    // TODO: validate request
    // const validation = await handleAsync();

    // Update user info
    const updateUser = await UserModel.findByIdAndUpdate(userId, body);
    if (!updateUser) {
      // TODO: implement logger
      console.log('User cannot be updated');
      return httpResponseHandler.unprocessableEntity(
        'User cannot be updated, please try again later.'
      );
    }
  } catch (error) {
    // TODO: implement logger
    console.log('Servver error');
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { create, update };
