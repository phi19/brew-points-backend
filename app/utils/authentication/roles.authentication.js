const passport = require("passport");
const HTTPStatusCodes = require("../HTTPStatusCodes");
const { RoleType } = require("@prisma/client");

// ROLES

const isUserAllowed = (necessaryRoles = [RoleType.USER], userRoles) => {
  if (Array.isArray(necessaryRoles)) {
    return necessaryRoles.every((userRole) => userRoles.includes(userRole));
  } else if (typeof necessaryRoles === "string") {
    return userRoles.includes(necessaryRoles);
  } else return false;
};

const roleAuthentication = (roles) => {
  return (req, res, next) => {
    passport.authenticate("jwt-access", { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(HTTPStatusCodes.UNAUTHORIZED).json("Unauthorized");
      }
      req.user = user;

      if (isUserAllowed(roles, user.roles)) {
        next();
      } else {
        return res.status(HTTPStatusCodes.FORBIDDEN).json("Unauthorized");
      }
    })(req, res, next);
  };
};

const jwtRefreshAuthentication = () => {
  return (req, res, next) => {
    passport.authenticate("jwt-refresh", { session: false }, (err) => {
      next(err);
    })(req, res, next);
  };
};

const socketRoleAuthenticate = (socket, next) => {
  try {
    passport.authenticate("jwt-access", { session: false }, (err, user) => {
      if (err || !user) {
        socket.errorCode = 401;
      } else {
        socket.user = user._doc;
      }
      next();
    })(socket.request, {});
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  roleAuthentication,
  socketRoleAuthenticate,
  jwtRefreshAuthentication,
};
