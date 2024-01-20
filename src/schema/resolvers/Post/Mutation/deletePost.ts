import { MutationDeletePostArgs } from "../../../../generated";
import { Context } from "../../../../utils";

export default (
	_parent: unknown,
	{ id }: MutationDeletePostArgs,
	{ prisma }: Context,
) => {
	return prisma.post.delete({
		where: { id },
	});
};
