import { QueryPostsArgs } from "../../../../generated";
import { Context } from "../../../../utils";

export default (_parent: unknown, args: QueryPostsArgs, ctx: Context) => {
	const where = args.searchTerm
		? {
				OR: [
					{ title: { contains: args.searchTerm } },
					{ content: { contains: args.searchTerm } },
				],
				published: true,
		  }
		: { published: true };

	return ctx.prisma.post.findMany({
		where,
	});
};
