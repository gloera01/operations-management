const withHttpResponse = (handler) => {
  return async (req, res, ...args) => {
    // TODO: implement logger
    console.log('Middleware WithHttpResponse');

    const httpResponse = await handler(req, res, ...args);
    res.status(httpResponse.statusCode).json(httpResponse);
  };
};

export default withHttpResponse;
