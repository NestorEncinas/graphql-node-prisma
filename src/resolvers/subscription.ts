export const Subscription = {
  newVote: async (parent, args, context, info) => {
    const newVoteSubscribe = context.prisma.$subscribe
      .link({ mutation_in: ["CREATED"] })
      .node();
    return {
      subscribe: newVoteSubscribe,
      resolve: payload => {
        return payload;
      }
    };
  },
  newLink: async (parent, args, context, info) => {
    const newLinkSubscribe = context.prisma.$subscribe
      .link({ mutation_in: ["CREATED"] })
      .node();
    return {
      subscribe: newLinkSubscribe,
      resolve: payload => {
        return payload;
      }
    };
  }
};
