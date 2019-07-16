export const link = (parent: any, args: any, context: any) => {
  return context.prisma.vote({ id: parent.id }).link();
};

const user = (parent: any, args: any, context: any) => {
  return context.prisma.vote({ id: parent.id }).user();
};

// module.exports = {
//   link,
//   user
// };
