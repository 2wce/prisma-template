import { QueryPostArgs } from "../../../../generated";
import { Context } from "../../../../utils";

export default (
	_parent: unknown,
	{ id }: QueryPostArgs,
	{ prisma }: Context,
) => {
	try {
		return prisma.post.findUnique({
			where: { id },
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};
