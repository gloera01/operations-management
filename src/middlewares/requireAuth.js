import passport from 'passport';
import httpResponseHandler from '../commons/httpResponseHandler';

const requireAuth = (req, res, next) => {
  // TODO: implement logger
  console.log('RequireAuth middleware:');

  return passport.authenticate(
    'jwt',
    { session: false },
    (err, user, infoErr) => {
      if (err) {
        // TODO: implement logger
        console.log(err);
        const response = httpResponseHandler.serverError(err);
        return res.status(response.statusCode).json(response);
      }

      if (infoErr) {
        // TODO: implement logger
        console.log(infoErr);
        const response = httpResponseHandler.unauthorized(infoErr.message);
        return res.status(response.statusCode).json(response);
      }

      if (!user) {
        // TODO: implement logger
        console.log('User was not found');
        const response = httpResponseHandler.unauthorized(
          'Not authorized to perform this request'
        );
        return res.status(response.statusCode).json(response);
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default requireAuth;
