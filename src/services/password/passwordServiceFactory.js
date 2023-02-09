import roles from '../../constants/roles';
import SuperAdminService from './superAdminService';
import UserService from './userService';

export const createService = (userType) => {
  if (userType === roles.SUPERADMIN) return new SuperAdminService();

  //default behavior
  return new UserService();
};

export default { createService };
