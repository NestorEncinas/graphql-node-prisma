const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  const userExist = await context.prisma.user({ email: args.email });

  if (!userExist) {
    throw new Error(`NO user found.`);
  }

  const validPassword = await bcrypt.compare(args.password, userExist.password);

  if (!validPassword) {
    throw new Error(`Wrong credentials`);
  }

  const token = jwt.sign({ userId: userExist.id }, APP_SECRET);

  return {
    token,
    user: userExist
  };
};

const post = async (parent, args, context) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
};

module.exports = {
  signup,
  login,
  post
};
