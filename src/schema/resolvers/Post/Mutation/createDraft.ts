import type { Context } from "@utils";
import { MutationCreateDraftArgs } from "../../../../generated";

export default (
	_parent: unknown,
	{ input }: MutationCreateDraftArgs,
	{ prisma, userId }: Context,
) => {
	const { title, content } = input;

	return prisma.post.create({
		data: {
			title,
			content,
			published: false,
			author: {
				connect: { id: userId },
			},
		},
	});
};
