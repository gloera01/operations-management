import OperationHistoryModel from '../../models/OperationHistory';
import AccountModel from '../../models/Account';
import httpResponseHandler from '../../commons/httpResponseHandler';

import { handleAsync } from '../../commons/validator';
import { getOperationsHistoryValidator } from '../../validators/operationsHistory';
import Joi from 'joi';

export const get = async (req) => {
  try {
    const { accountId } = req.params;

    // inputs validation
    const validation = await handleAsync([
      getOperationsHistoryValidator.validateAsync(req.query),
      Joi.string().required().label('accountId').validateAsync(accountId),
    ]);
    if (!validation.valid) {
      // TODO: implement logger
      console.log('Validation errors');
      return httpResponseHandler.badRequest(validation.stringError);
    }

    const foundAccount = await AccountModel.findById(accountId);
    if (!foundAccount) {
      // TODO: implement logger
      console.log('Target Account was not found');
      return httpResponseHandler.badRequest('Target Account does not exist');
    }

    // handle filters
    const defaultFilters = {
      page: 1,
      pageSize: 10,
      sortBy: 'createDate',
      sortOrder: 'desc',
    };
    const allFilters = {
      ...defaultFilters,
      ...req.query,
    };
    const filters = {
      ['account.name']: foundAccount.name,
    };
    const options = {
      page: allFilters.page,
      limit: allFilters.pageSize,
      sort: { [allFilters.sortBy]: allFilters.sortOrder },
    };

    if (allFilters.memberName) {
      filters['user.name'] = new RegExp(`.*${allFilters.memberName}.*`, 'i');
    }
    if (allFilters.memberEmail) {
      filters['user.email'] = new RegExp(`.*${allFilters.memberEmail}.*`, 'i');
    }
    // TODO: consider dates by range
    // member startDate
    // member endDate

    // get from collection
    const operationsRes = await OperationHistoryModel.paginate(
      filters,
      options
    );

    // TODO: implement logger
    console.log(operationsRes);
    return httpResponseHandler.ok(operationsRes);
  } catch (error) {
    // TODO: implement logger
    console.log(error);
    return httpResponseHandler.serverError(error.message);
  }
};

export default { get };
