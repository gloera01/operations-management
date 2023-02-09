class SuperAdminService {
  async verify(plainTextPwd, dbUserPwd) {
    return plainTextPwd === dbUserPwd;
  }
}

export default SuperAdminService;
