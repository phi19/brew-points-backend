const prisma = require("../../../prisma/prismaClient");
const { HTTP403Error } = require("../../utils/errors/custom");

exports.throwErrorIfTokenIsBlacklistedOrBlacklistJWT = async (jwtRefresh) => {
  const isTokenBlacklisted = await prisma.blacklistedJWT.findUnique({
    where: {
      token: jwtRefresh,
    },
  });

  if (isTokenBlacklisted) {
    throw new HTTP403Error("You are not authenticated");
  }

  await this.invalidateRefreshToken(jwtRefresh);
};

exports.invalidateRefreshToken = async (token) => {
  await prisma.blacklistedJWT.create({
    data: {
      token,
    },
  });
};
