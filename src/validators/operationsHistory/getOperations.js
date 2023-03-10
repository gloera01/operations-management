import Joi from 'joi';

export default Joi.object({
  page: Joi.number().greater(0),
  pageSize: Joi.number().greater(0),
  sortOrder: Joi.string().valid('asc', 'desc'),
  createDate: Joi.date(),
  memberStartDate: Joi.date(),
  memberEndDate: Joi.date(),
  memberName: Joi.string(),
  memberEmail: Joi.string(),
});
