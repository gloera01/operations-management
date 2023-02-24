import Joi from 'joi';

const sortOptions = [
  'name',
  'client',
  'operationsManager',
  'createDate',
  'modifiedDate',
];

export default Joi.object({
  name: Joi.string(),
  client: Joi.string(),
  operationsManager: Joi.string(),
  page: Joi.number().greater(0),
  pageSize: Joi.number().greater(0),
  createDate: Joi.date(),
  modifiedDate: Joi.date(),
  sortBy: Joi.string().valid(...sortOptions),
  sortOrder: Joi.string().valid(...['asc', 'desc']),
});
