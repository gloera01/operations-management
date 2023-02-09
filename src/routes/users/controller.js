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

export default { create };
