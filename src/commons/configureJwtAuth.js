import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/User';
import { jwtSecret } from '../../config';

const configureAuth = () => {
  const options = {
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };
  const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
    // check if token belongs to an existing user
    UserModel.findById(jwt_payload.sub)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, null, 'Cannot retrieve user data');
        }
      })
      .catch((err) => {
        return done(err, null);
      });
  });
  passport.use(jwtStrategy);
};

export default configureAuth;
