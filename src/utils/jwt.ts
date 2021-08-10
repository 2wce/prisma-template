import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { clone } from 'lodash'

interface Token {
  id: string
}

// get user id from auth token
export function getUserId({ headers }: any) {
  if (headers) {
    const Authorization = headers.authorization || headers.Authorization

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
export const issue = (payload: any, jwtOptions = {}) => {
  return sign(
    clone(payload.toJSON ? payload.toJSON() : payload),
    process.env.JWT_SECRET as string,
    jwtOptions,
  )
}

export const hashPassword = (password: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!password || isHashed(password)) {
      resolve(null)
    } else {
      hash(`${password}`, 10, (err, hash) => {
        if (err) {
          return reject(err)
        }
        resolve(hash)
      })
    }
  })
}

export const isHashed = (password: string) => {
  if (typeof password !== 'string' || !password) {
    return false
  }

  return password.split('$').length === 4
}

export const validatePassword = (password: string, hash: string) => {
  return compare(password, hash)
}
