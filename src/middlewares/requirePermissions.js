import httpResponseHandler from '../commons/httpResponseHandler';

const requirePermissions = (roles) => {
  return (req, res, next) => {
    // TODO: implement logger
    console.log('RequirePermissions middleware');

    const { user } = req;

    if (!roles.includes(user.role)) {
      const response = httpResponseHandler.forbidden(
        `Action forbidden for ${user.role}`
      );
      return res.status(response.statusCode).json(response);
    }

    next();
  };
};

export default requirePermissions;
