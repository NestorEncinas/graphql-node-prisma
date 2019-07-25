import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { APP_SECRET, getUserId } = require("../utils");

export const Mutation = {
  signup: async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user
    };
  },
  login: async (parent, args, context, info) => {
    const userExist = await context.prisma.user({ email: args.email });

    if (!userExist) {
      throw new Error(`NO user found.`);
    }

    const validPassword = await bcrypt.compare(
      args.password,
      userExist.password
    );

    if (!validPassword) {
      throw new Error(`Wrong credentials`);
    }

    const token = jwt.sign({ userId: userExist.id }, APP_SECRET);

    return {
      token,
      user: userExist
    };
  },
  post: async (parent, args, context) => {
    const userId = getUserId(context);
    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    });
  },
  vote: async (parent, args, context, info) => {
    const userId = getUserId(context);

    const linkExists = await context.prisma.$exists.vote({
      user: { id: userId, link: { id: args.linkId } }
    });

    if (linkExists) {
      throw new Error(`Already voted for link ${args.linkId}`);
    }

    return context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    });
  }
};
