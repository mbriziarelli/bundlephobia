import { CustomError } from 'package-build-stats'
import { ServerError } from 'bundlephobia-errors'
import customErrors from './customErrors'

const customErrorNames = Object.keys(customErrors)

export const makeBadPackageNameError = (name: unknown): ServerError => ({
  statusCode: 400,
  code: 'BadRequest',
  message: `Invalid or empty package name: "${name}"`,
})

export const isCustomError = (error: unknown): error is CustomError => {
  if (error) {
    const name = Object.getOwnPropertyDescriptor(error, 'name')?.value
    return name ? customErrorNames.includes(name) : false
  }

  return false
}

export const makeErrorFromCustomError = (error: CustomError): ServerError =>
  customErrors[error.name]

export const genericServerError: ServerError = {
  statusCode: 500,
  code: 'ServerError',
  message: 'An unexpected error occured.',
}
