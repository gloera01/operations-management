import bcrypt from 'bcrypt';

class BaseService {
  verify(plainText, hashedPass) {
    return bcrypt.compare(plainText, hashedPass);
  }

  async hashify(plainTextPwd) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPwd, salt);
  }
}

export default BaseService;
