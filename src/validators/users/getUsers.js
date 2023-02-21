import Joi from 'joi';
import roles from '../../constants/roles';

const validSortOpts = [
  'email',
  'name',
  'active',
  'role',
  'createDate',
  'modifiedDate',
];

export default Joi.object({
  email: Joi.string(),
  name: Joi.string(),
  page: Joi.number().greater(0),
  pageSize: Joi.number().greater(0),
  active: Joi.bool(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .optional(),
  createDate: Joi.date(),
  modifiedDate: Joi.date(),
  sortBy: Joi.string().valid(...validSortOpts),
  sortOrder: Joi.string().valid(...['asc', 'desc']),
});
