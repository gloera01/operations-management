import Joi from 'joi';
import Roles from '../../constants/roles';
import EnglishLevels from '../../constants/englishLevels';

export default Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  modifiedDate: Joi.date().optional(),
  active: Joi.boolean().default(true),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .required(),
  englishLevel: Joi.string()
    .valid(...Object.values(EnglishLevels))
    .required(),
  techSkills: Joi.array().items(Joi.string()),
  resumeLink: Joi.string().optional(),
});
