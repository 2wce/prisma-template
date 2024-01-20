/*
 * Import the 'merge' function from the 'lodash' library.
 * This function is used to combine properties of two or more objects into a single object.
 */
import { merge } from "lodash";

/*
 * Import the 'Post' and 'User' modules from the local files './Post' and './User'.
 * These modules define the data and operations for posts and users in your application.
 */
import Post from "./Post";
import User from "./User";

/*
 * Export the result of merging the 'Post' and 'User' objects into an empty object.
 * This creates a new object that includes all the properties and methods from 'Post' and 'User'.
 * If 'Post' and 'User' have properties or methods with the same name, the ones from 'User' will overwrite the ones from 'Post'.
 */
export default merge({}, Post, User);
