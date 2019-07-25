export const Vote = {
  link: async (parent, args, context) => {
    return context.prisma.vote({ id: parent.id }).link();
  },
  user: async (parent, args, context) => {
    return context.prisma.vote({ id: parent.id }).user();
  }
};
