import { MutationPublishArgs } from "../../../../generated";
import { Context } from "../../../../utils";

export default (
	_parent: unknown,
	{ id }: MutationPublishArgs,
	ctx: Context,
) => {
	return ctx.prisma.post.update({
		where: { id },
		data: { published: true },
	});
};
