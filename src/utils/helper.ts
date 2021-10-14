export const formatError = (nameOfFunction: string, error: Error) => {
  return process.env.NODE_ENV === 'test'
    ? ''
    : console.log(`----${nameOfFunction}----`, error)
}

// RegExp to check if email is valid
export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
