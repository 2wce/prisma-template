import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { clone } from 'lodash'
import { Context } from './prisma'

interface Token {
  id: string
}

type User = {
  id: number
}

// get user id from auth token
export function getUserId({ request }: Context): string | undefined {
  if (request && request.headers) {
    const Authorization =
      request.headers.authorization || request.headers.Authorization

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')

      const verifiedToken = verify(
        token,
        process.env.JWT_SECRET as string,
      ) as Token

      return verifiedToken && verifiedToken.id
    }
  }
  return undefined
}

// issue new token based on payload
export const issue = (payload: string | User | Buffer, jwtOptions = {}) => {
  return sign(clone(payload), process.env.JWT_SECRET as string, jwtOptions)
}

export const isHashed = (password: string) => {
  if (typeof password !== 'string' || !password) {
    return false
  }

  return password.split('$').length === 4
}

export const hashPassword = (password: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!password || isHashed(password)) {
      resolve(null)
    } else {
      hash(`${password}`, process.env.SALT as string, (err, hash) => {
        if (err) {
          return reject(err)
        }
        resolve(hash)
      })
    }
  })
}

export const validatePassword = (password: string, hash: string) => {
  return compare(password, hash)
}
