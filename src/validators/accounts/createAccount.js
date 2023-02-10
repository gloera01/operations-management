import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  client: Joi.string().required(),
  operationsManager: Joi.string().required(),
  members: Joi.array()
    .default([])
    .items(
      Joi.object({
        assignationStartDate: Joi.date().required(),
        assignationEndDate: Joi.date().required(),
        userId: Joi.string().required(),
      }).optional()
    ),
});
