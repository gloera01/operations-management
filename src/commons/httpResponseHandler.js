import statusCodes from '../constants/httpCodes';

const baseResponse = {
  statusCode: 200,
  message: 'Success',
  errorMessage: null,
  payload: null,
};

class HttpResponseHandler {
  constructor(expressResponse) {
    this.#res = expressResponse;
  }

  #res = null;

  #setResponse(response) {
    this.#res.status(response.statusCode).json(response);
    return response;
  }

  makeCustom(customResponse) {
    this.#res.status(customResponse.statusCode).json(customResponse);
    return customResponse;
  }

  ok(payload, customMessage = 'Success') {
    const response = {
      statusCode: statusCodes.ok,
      message: customMessage,
      payload,
    };
    this.#res.status(statusCodes.ok).json(response);
    return response;
  }

  created(payload, message = 'Created') {
    return this.#setResponse({
      statusCode: statusCodes.created,
      message,
      payload,
    });
  }

  accepted(payload, message = 'Accepted') {
    return this.#setResponse({
      statusCode: statusCodes.accepted,
      message,
      payload,
    });
  }

  badRequest(errorMessage = 'Validation errors', message = 'Bad request') {
    return this.#setResponse({
      statusCode: statusCodes.badRequest,
      errorMessage,
      message,
    });
  }

  unauthorized(
    errorMessage = 'Need additional permissions to perform this action',
    message = 'Unauthorized'
  ) {
    return this.#setResponse({
      statusCode: statusCodes.unauthorized,
      errorMessage,
      message,
    });
  }

  notFound(errorMessage = 'Resource was not found', message = 'Not found') {
    return this.#setResponse({
      message,
      errorMessage,
      statusCode: statusCodes.notFound,
    });
  }

  conflict(errorMessage = 'Entity already exists', message = 'Conflict') {
    return this.#setResponse({
      statusCode: statusCodes.conflict,
      errorMessage,
      message,
    });
  }

  serverError(error) {
    return this.#setResponse({
      statusCode: statusCodes.internalServerError,
      message: 'Internal server error',
      errorMessage: error.message,
    });
  }
}

export default HttpResponseHandler;
