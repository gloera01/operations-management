const withHttpResponse = (handler) => {
  // TODO: implement logger
  console.log('Middleware WithHttpResponse:');
  return async (req, res, ...args) => {
    const httpResponse = await handler(req, res, ...args);
    res.status(httpResponse.statusCode).json(httpResponse);
  };
};

export default withHttpResponse;
