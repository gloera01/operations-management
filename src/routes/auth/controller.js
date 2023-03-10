import jsonwebtoken from 'jsonwebtoken';
import httpResponseHandler from '../../commons/httpResponseHandler';
import UserModel from '../../models/User';
import passwordServiceFactory from '../../services/password/passwordServiceFactory';

import { jwtSecret } from '../../../config';
import { handleAsync } from '../../commons/validator';
import { loginValidator } from '../../validators/auth';

export const login = async (req) => {
  try {
    // validate request body
    const validationResponse = await handleAsync([
      loginValidator.validateAsync(req.body),
    ]);

    if (!validationResponse.valid) {
      // TODO:
      // log error
      console.log('Validation errors');
      return httpResponseHandler.badRequest(validationResponse.stringError);
    }

    const { email, password } = req.body;

    // validate user exist on DB
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      // TODO: implement logger
      console.log('User is not found');
      return httpResponseHandler.unauthorized('Invalid credentials');
    }

    // verify credentials
    const passwordService = passwordServiceFactory.createService(
      foundUser.role
    );
    const passwordMatch = await passwordService.verify(
      password,
      foundUser.password
    );
    if (!passwordMatch) {
      // TODO: implement logger
      console.log('Password is incorrect');
      return httpResponseHandler.unauthorized('Invalid credentials');
    }

    // generate access token with HMAC SHA256 (default)
    const expiration = '1h';
    const token = jsonwebtoken.sign(
      {
        iat: Date.now(),
        sub: foundUser.id,
      },
      jwtSecret,
      {
        expiresIn: expiration,
      }
    );

    return httpResponseHandler.ok({ accessToken: token });
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponseHandler.serverError(error);
  }
};

export default { login };
