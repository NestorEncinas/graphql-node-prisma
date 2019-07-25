export const User = {
  links: async (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).links();
  }
};
