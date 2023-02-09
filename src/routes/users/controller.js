import HttpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';
import signupServiceFactory from '../../services/signupServiceFactory';

export const create = async (req, res) => {
  const httpResponse = new HttpResponseHandler(res);
  try {
    const { role: userType } = req.body;
    const signupService = signupServiceFactory.createService(
      userType,
      UserModel
    );
    return signupService.signup(req.body);
  } catch (error) {
    // TODO: implement logger
    console.log('Server error');
    return httpResponse.serverError(error);
  }
};

export default { create };
