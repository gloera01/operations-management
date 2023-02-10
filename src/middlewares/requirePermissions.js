import httpResponseHandler from '../commons/httpResponseHandler';

const requirePermissions = (roles) => {
  return (req, res, next) => {
    // TODO: implement logger
    console.log('RequirePermissions middleware');

    const userRole = req?.user?.role;

    if (!roles.includes(userRole)) {
      const response = httpResponseHandler.forbidden(
        `Action available only for roles: (${roles.toString()})`
      );
      return res.status(response.statusCode).json(response);
    }

    next();
  };
};

export default requirePermissions;
