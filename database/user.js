const prisma = require("./prisma");

const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

const createUser = (user) => {
  return prisma.user.create({
    data: user
  });
}


module.exports = {
  findByEmail,
  createUser
}