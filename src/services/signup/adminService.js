import BaseService from './baseService';
import { signupAdminValidator } from '../../validators/users';

class UserService extends BaseService {
  constructor(userModel, responseHandler, passwordService) {
    super(userModel, responseHandler, passwordService);
  }

  async validate(adminUserDTO) {
    // validation for specific user role
    return signupAdminValidator.validateAsync(adminUserDTO);
  }
}

export default UserService;
