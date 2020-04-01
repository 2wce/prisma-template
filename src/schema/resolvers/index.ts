import { merge } from 'lodash'
import Post from './Post'
import User from './User'

export default merge({}, Post, User)
