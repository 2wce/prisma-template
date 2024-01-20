import type { QueryPostArgs, QueryPostsArgs } from "@/generated";
import type { Context } from "@/utils";
import type { Post } from "@prisma/client";

/*
 * Export an object that includes the 'post' and 'posts' modules.
 * This object can be used to map the 'post' and 'posts' queries in your GraphQL schema to their corresponding resolvers.
 */
export default {
  posts: (_parent: unknown, args: QueryPostsArgs, ctx: Context) => {
    /*
     * Define the 'where' object, which includes the conditions for the posts to get.
     * If a search term is provided, the posts to get should have a title or content that contains the search term and be published.
     * If no search term is provided, the posts to get should just be published.
     */
    const where = args.searchTerm
      ? {
          OR: [
            { title: { contains: args.searchTerm } },
            { content: { contains: args.searchTerm } },
          ],
          published: true,
        }
      : { published: true };

    /*
     * Return a promise that resolves to the posts that match the conditions in the 'where' object.
     * The 'prisma' client from the context is used to find the posts in the database.
     */
    return ctx.prisma.post.findMany({
      where,
    });
  },
  post: async (
    _parent: unknown,
    { id }: QueryPostArgs,
    { prisma }: Context,
  ): Promise<Post | null> => {
    try {
      /*
       * Try to find the post with the given ID in the database using the 'prisma' client.
       * If the post is found, return it.
       */
      return await prisma.post.findUnique({
        where: { id },
      });
    } catch (error) {
      /*
       * If an error occurs while trying to find the post, log the error and return it.
       */
      console.log(error);
      throw error as Error;
    }
  },
};
