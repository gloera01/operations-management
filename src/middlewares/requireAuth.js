import passport from 'passport';
import HttpResponseHandler from '../commons/httpResponseHandler';

const generateMiddleware = () => {
  return (req, res, next) => {
    const httpResponse = new HttpResponseHandler(res);
    const authenticator = passport.authenticate(
      'jwt',
      { session: false },
      (err, user, infoErr) => {
        if (err) {
          // TODO: implement logger
          console.log(err);
          return httpResponse.serverError(err);
        }

        if (infoErr) {
          // TODO: implement logger
          console.log(infoErr);
          return httpResponse.unauthorized(infoErr.message);
        }

        if (!user) {
          // TODO: implement logger
          console.log('User was not found');
          return httpResponse.unauthorized(
            'Not authorized to perform this request'
          );
        }

        req.user = user;
        next();
      }
    );
    return authenticator(req, res, next);
  };
};

export default generateMiddleware();
