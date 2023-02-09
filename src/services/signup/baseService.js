import validator from '../../commons/validator';

class BaseService {
  constructor(userModel, responseHandler, passwordService) {
    this.userModel = userModel;
    this.responseHandler = responseHandler;
    this.passwordService = passwordService;
  }

  // Abstract method
  async validate() {
    throw new Error('Method not implemented by subclass');
  }

  async signup(userData) {
    const validation = await validator.handleAsync([this.validate(userData)]);
    if (!validation.valid) {
      // TODO:
      // log error
      console.log('Validation errors');
      return this.responseHandler.badRequest(validation.stringError);
    }

    // verify email is not already registered
    const foundUser = await this.userModel.findOne({ email: userData.email });
    if (foundUser) {
      return this.responseHandler.conflict('Email is already registered');
    }

    // hash incoming password
    const hashedPassword = await this.passwordService.generateHash(
      userData.password
    );
    const userDTO = { ...userData, password: hashedPassword, pets: [] };

    // Store user in DB
    const newUser = await new this.userModel(userDTO).save();

    if (!newUser) {
      // TODO:
      // unprocessable entity
      console.log('User cannot be processed');
      return this.responseHandler.unprocessableEntity(
        'User cannot be created at this moment, please retry later.'
      );
    }

    // TODO:
    // map newUser into DTO user
    return this.responseHandler.created(newUser, 'User created successfully.');
  }
}

export default BaseService;
