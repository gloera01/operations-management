import BaseService from './baseService';
import { signupUserValidator } from '../../validators/users';

class UserService extends BaseService {
  constructor(userModel, responseHandler, passwordService) {
    super(userModel, responseHandler, passwordService);
  }

  async validate(userDTO) {
    // validation for specific user role
    return signupUserValidator.validateAsync(userDTO);
  }
}

export default UserService;
