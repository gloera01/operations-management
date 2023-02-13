import signupUser from './signupUser';
import signupAdmin from './signupAdmin';
import updateAdmin from './update/updateAdmin';
import updateUser from './update/updateUser';

export const signupUserValidator = signupUser;
export const signupAdminValidator = signupAdmin;

export const updateUserValidator = updateUser;
export const updateAdminValidator = updateAdmin;

export default {
  signupUserValidator,
  signupAdminValidator,
  updateUserValidator,
  updateAdminValidator,
};
