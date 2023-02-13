import Joi from 'joi';

export default Joi.object({
  name: Joi.string().optional(),
  englishLevel: Joi.string().optional(),
  techSkills: Joi.array().items(Joi.string()).optional(),
  resumeLink: Joi.string().optional(),
});
