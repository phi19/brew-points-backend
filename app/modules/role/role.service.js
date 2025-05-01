const { RoleType } = require("@prisma/client");
const prisma = require("../../../prisma/prismaClient");

exports.attributeRole = async (user) => {
  await prisma.role.create({
    data: {
      user,
      role: RoleType.USER,
    },
  });
};
