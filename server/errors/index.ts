import { CustomError, CustomErrorName } from 'package-build-stats'
import { ServerError } from './types'

const customErrors: Record<CustomErrorName, ServerError> = {
  PackageNotFoundError: {
    statusCode: 400,
    code: 'PackageNotFoundError',
    message: 'Package not found.',
  },
  InstallError: {
    statusCode: 500,
    code: 'InstallError',
    message: 'Error while installing package.',
  },
  EntryPointError: {
    statusCode: 500,
    code: 'EntryPointError',
    message: 'Error while building package.',
  },
  MissingDependencyError: {
    statusCode: 500,
    code: 'MissingDependencyError',
    message: 'A package dependency is missing.',
  },
  CLIBuildError: {
    statusCode: 500,
    code: 'CLIBuildError',
    message: 'Building package from cli failed.',
  },
  BuildError: {
    statusCode: 500,
    code: 'BuildError',
    message: 'Building package failed.',
  },
}

const customErrorNames = Object.keys(customErrors)

export const makeBadPackageNameError = (name: unknown): ServerError => ({
  statusCode: 400,
  code: 'BadRequest',
  message: `Invalid or empty package name: "${name}"`,
})

export const isCustomError = (error: unknown): error is CustomError => {
  const name = Object.getOwnPropertyDescriptor(error, 'name')?.value
  return name ? customErrorNames.includes(name) : false
}

export const makeErrorFromCustomError = (error: CustomError): ServerError =>
  customErrors[error.name]

export const genericServerError: ServerError = {
  statusCode: 500,
  code: 'ServerError',
  message: 'An unexpected error occured.',
}
