import HttpResponseHandler from '../../commons/httpResponseHandler';
import jsonwebtoken from 'jsonwebtoken';
import UserModel from '../../models/User';
import passwordService from '../../services/passwordService';

import { jwtSecret } from '../../../config';
import { handleAsync } from '../../commons/validator';
import { loginValidator } from '../../validators/auth';

export const login = async (req, res) => {
  const httpResponse = new HttpResponseHandler(res);
  try {
    // validate request body
    const validationResponse = await handleAsync([
      loginValidator.validateAsync(req.body),
    ]);

    if (!validationResponse.valid) {
      // TODO:
      // log error
      console.log('Validation errors');
      return httpResponse.badRequest(validationResponse.stringError);
    }

    const { email, password } = req.body;

    // validate user exist on DB
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      // TODO: implement logger
      console.log('User is not found');
      return httpResponse.unauthorized('Invalid credentials');
    }

    // verify credentials
    const passwordMatch = await passwordService.match(
      password,
      foundUser.password
    );
    if (!passwordMatch) {
      // TODO: implement logger
      console.log('Password is incorrect');
      return httpResponse.unauthorized('Invalid credentials');
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

    return httpResponse.ok({ accessToken: token });
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponse.serverError(error);
  }
};

export default { login };
