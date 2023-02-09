import BaseService from './baseService';
import { createUserValidator } from '../../validators/users';

class UserService extends BaseService {
  constructor(userModel, responseHandler, passwordService) {
    super(userModel, responseHandler, passwordService);
  }

  async validate(userDTO) {
    // validation for specific user role
    return createUserValidator.validateAsync(userDTO);
  }
}

export default UserService;
