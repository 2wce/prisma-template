import { getUserId, type Context } from "@/utils";

export default {
  me: async (_parent: unknown, _args: unknown, { prisma, req }: Context) => {
    /*
     * Get the ID of the current user from the request object using the 'getUserId' function.
     */
    const userId = getUserId(req);

    /*
     * Return a promise that resolves to the current user.
     * The 'prisma' client from the context is used to find the user in the database with the ID of the current user.
     */
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};
