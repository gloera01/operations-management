import statusCodes from '../constants/httpCodes';

export const makeCustom = (customResponse) => customResponse;

export const ok = (payload, message = 'Success') => ({
  statusCode: statusCodes.ok,
  message,
  payload,
});

export const created = (payload, message = 'Created') => ({
  statusCode: statusCodes.created,
  message,
  payload,
});

export const accepted = (payload, message = 'Accepted') => ({
  statusCode: statusCodes.accepted,
  message,
  payload,
});

export const badRequest = (
  errorMessage = 'Validation errors',
  message = 'Bad request'
) => ({
  statusCode: statusCodes.badRequest,
  errorMessage,
  message,
});

export const unauthorized = (
  errorMessage = 'Need additional permissions to perform this action',
  message = 'Unauthorized'
) => ({
  statusCode: statusCodes.unauthorized,
  errorMessage,
  message,
});

export const notFound = (
  errorMessage = 'Resource was not found',
  message = 'Not found'
) => ({
  message,
  errorMessage,
  statusCode: statusCodes.notFound,
});

export const forbidden = (
  errorMessage = 'Additional permissions are required',
  message = 'Forbidden'
) => ({
  errorMessage,
  message,
  statusCode: statusCodes.forbidden,
});

export const conflict = (
  errorMessage = 'Entity already exists',
  message = 'Conflict'
) => ({
  statusCode: statusCodes.conflict,
  errorMessage,
  message,
});

export const unprocessableEntity = (
  errorMessage = 'Entity cannot be proccessed at this moment, please try again later',
  message = 'Unprocessable Entity'
) => ({ errorMessage, message, statusCode: statusCodes.unprocessableEntity });

export const serverError = (
  errorMessage,
  message = 'Internal server error'
) => ({
  statusCode: statusCodes.internalServerError,
  message,
  errorMessage,
});

const httpResponseHandler = {
  makeCustom,
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  serverError,
};

export default httpResponseHandler;
