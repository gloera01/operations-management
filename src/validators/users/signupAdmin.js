import Joi from 'joi';
import roles from '../../constants/roles';

export default Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  active: Joi.boolean().default(true),
  role: Joi.string()
    .valid(...Object.values(roles))
    .required(),
});
