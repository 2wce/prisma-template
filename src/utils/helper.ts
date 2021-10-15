import { ResetPasswordInput } from '../generated'

export const formatError = (nameOfFunction: string, error: Error) => {
  return process.env.NODE_ENV === 'test'
    ? ''
    : console.log(`----${nameOfFunction}----`, error)
}

// RegExp to check if email is valid
export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const generateRandomOtp = (noOfDigits: number): number => {
  const multiplier = Math.pow(10, noOfDigits - 1)
  return Math.floor(multiplier + Math.random() * (9 * multiplier))
}

export const hasValidResetPasswordInput = (
  params: ResetPasswordInput,
): boolean => {
  const { password, passwordConfirmation, code } = params

  // check if all values are present
  const isAllValuesPresent = Boolean(
    password &&
      passwordConfirmation &&
      code &&
      password.length > 0 &&
      passwordConfirmation.length > 0,
  )

  // check if password and password confirmation are equal
  const isPasswordEqual = Boolean(password === passwordConfirmation)

  return isAllValuesPresent && isPasswordEqual
}
