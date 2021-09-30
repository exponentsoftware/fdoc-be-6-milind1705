const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const user = require("../models/user");
module.exports = function (passport) {
  passport.use(
    new jwtStrategy(
      {
        secretOrKey: process.env.SECRETE,
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload, cb) {
        user.findOne({ _id: jwt_payload._id }, (err, user) => {
          if (err) {
            cb(err, false);
          }
          if (user) {
            cb(null, user);
          } else {
            cb(null, false);
          }
        });
      }
    )
  );
};
