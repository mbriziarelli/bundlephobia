import { CustomError, CustomErrorName } from "package-build-stats"

const customErrors: Record<CustomErrorName, { statusCode: number, message: string }> = {
  "PackageNotFoundError": {
    statusCode: 400,
    message: "Package Not Found",
  },
  "InstallError": {
    statusCode: 500,
    message: "Install Error",
  },
  "EntryPointError": {
    statusCode: 500,
    message: "Entry Point Error",
  },
  "MissingDependencyError": {
    statusCode: 500,
    message: "Missing Dependency Error",
  },
  "CLIBuildError": {
    statusCode: 500,
    message: "CLI Build Error",
  },
  "BuildError"  : {
    statusCode: 500,
    message: "Build Error",
  },
}

const customErrorNames = Object.keys(customErrors)

export const isValidPackageName = (packageName: unknown): packageName is string => typeof packageName === 'string' && packageName.length > 0

export const makeBadPackageNameError = (packageName: unknown): { code: string, message: string } => ({
  code: 'Bad Request',
  message: `Invalid or empty package name: "${packageName}"`
})

export const isCustomError = (error: unknown): error is CustomError => {
  const nameDescriptor = Object.getOwnPropertyDescriptor(error, "name")
  return nameDescriptor ? customErrorNames.includes(nameDescriptor.value) : false
}

export const makeErrorFromCustomError = (customError: CustomError) => customErrors[customError.name]
