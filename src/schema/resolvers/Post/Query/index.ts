/*
 * Import the 'post' and 'posts' modules.
 * These modules include GraphQL resolvers for getting a post by its ID and getting posts based on a search term, respectively.
 */
import post from "./post";
import posts from "./posts";

/*
 * Export an object that includes the 'post' and 'posts' modules.
 * This object can be used to map the 'post' and 'posts' queries in your GraphQL schema to their corresponding resolvers.
 */
export default {
	posts,
	post,
};
