const {
  encryptPassword,
} = require("../../utils/authentication/authentication.helper");
const {
  generateJWTTokens,
} = require("../../utils/authentication/middlewares.authentication");
const { HTTP409Error } = require("../../utils/errors/custom");
const { serializeSingleUser } = require("./user.serializer");
const bcrypt = require("bcrypt");
const RoleService = require("../role/role.service");
const BlacklistedJWTsService = require("../blacklistedJWTs/blacklistedJWTs.service");
const { jwtDecode } = require("jwt-decode");
const prisma = require("../../../prisma/prismaClient");

exports.login = async (user) => {
  return generateJWTTokens(user.email);
};

exports.register = async (name, email, password) => {
  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    throw new HTTP409Error("Esse utilizador já existe", {
      type: "email",
    });
  }

  const { hash: hashedPassword, salt } = encryptPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      passwordSalt: salt,
      name: name,
    },
  });

  await RoleService.attributeRole(newUser);

  return {
    user: serializeSingleUser(newUser),
  };
};

exports.refreshToken = async (refreshToken) => {
  const decodedToken = jwtDecode(refreshToken);
  const email = decodedToken.email;
  // - check if token is blacklisted
  // - if not:
  //    - kill old refresh token
  await BlacklistedJWTsService.throwErrorIfTokenIsBlacklistedOrBlacklistJWT(
    refreshToken
  );

  // - generate new access and refresh tokens
  return generateJWTTokens(email);
};
