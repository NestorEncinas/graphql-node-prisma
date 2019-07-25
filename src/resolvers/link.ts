export const Link = {
  postedBy: async (parent, context) => {
    return context.prisma.link({ id: parent.id }).postedBy();
  },
  votes: async (parent, context) => {
    return context.prisma.link({ id: parent.id }).votes();
  }
};
