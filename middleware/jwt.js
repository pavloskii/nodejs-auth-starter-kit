const expressJwt = require("express-jwt");
const usersService = require("../services/users");

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: ["/users/login", "/users/register"]
  });
}

async function isRevoked(req, payload, done) {
  const user = await usersService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
