import { Context, getUserId } from "../../../../utils";

export default (_parent: unknown, _args: unknown, ctx: Context) => {
	const userId = getUserId(ctx);

	return ctx.prisma.user.findUnique({
		where: {
			id: Number(userId),
		},
	});
};
