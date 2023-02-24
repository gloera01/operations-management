import Joi from 'joi';

export default Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  userId: Joi.string().required(),
});
