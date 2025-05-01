const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { serializeSingleUser } = require("../app/modules/user/user.serializer");
const {
  validatePassword,
} = require("../app/utils/authentication/authentication.helper");
const { HTTP404Error, HTTP403Error } = require("../app/utils/errors/custom");
const prisma = require("../prisma/prismaClient");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("./constants");

const passportLocalStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new HTTP404Error("Esse utilizador não existe", {
          type: "email",
        });
      }

      const arePasswordsEqual = validatePassword(
        password,
        user.password,
        user.passwordSalt
      );

      if (!arePasswordsEqual) {
        throw new HTTP403Error("Palavra-passe errada", { type: "password" });
      }

      return done(null, {
        loginUser: { id: user.id, email: user.email },
        formattedUser: serializeSingleUser(user),
      });
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

const cookieExtractor = (index, value, storeValue) =>
  function (req) {
    const cookies = req.headers.cookie;

    if (!cookies) return;

    let allCookies = cookies.split("; ");

    if (!allCookies) return null;

    const token = allCookies[index].replace(value + "=", "");

    if (storeValue) {
      req[value] = token;
    }

    return token;
  };

const accessTokenExtractor = cookieExtractor(0, "accessToken");
const refreshTokenExtractor = cookieExtractor(1, "refreshToken", true);

const passportJwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: accessTokenExtractor, // ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: jwtPayload.email,
        },
        include: {
          Roles: true,
        },
      });

      if (!user) return done(null, false);

      return done(null, {
        ...user,
        roles: user.Roles.map((role) => role.role),
      });
    } catch (error) {
      return done(error);
    }
  }
);

const passportJwtRefreshStrategy = new JwtStrategy(
  {
    jwtFromRequest: refreshTokenExtractor, // ExtractJwt.fromHeader("x-jwt-refresh")
    secretOrKey: JWT_REFRESH_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: jwtPayload.email,
        },
      });

      if (!user) throw new HTTP404Error("User not found");

      return done(null, true);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = {
  passportLocalStrategy,
  passportJwtStrategy,
  passportJwtRefreshStrategy,
};
