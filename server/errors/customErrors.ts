import { CustomErrorName } from 'package-build-stats'
import { ServerError } from 'bundlephobia-errors'

export default {
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
} as Record<CustomErrorName, ServerError>
