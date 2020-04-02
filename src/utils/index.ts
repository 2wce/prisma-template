import { verify } from 'jsonwebtoken'
import { Context, createContext } from './context'

const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

export { Context, createContext, getUserId, APP_SECRET }
