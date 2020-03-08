/** @typedef {import("package-build-stats").CustomError} CustomError */
/** @typedef {import("package-build-stats").CustomErrorName} CustomErrorName */

/** @type { Record<CustomErrorName, { statusCode: number, message: string }> } */
const customErrors = {
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

/** @type { (packageName: unknown) => packageName is string } */
exports.isValidPackageName = packageName => typeof packageName === 'string' && packageName.length > 0

/** @type { (packageName: unknown) => { code: string, message: string } } */
exports.makeBadPackageNameError = packageName => ({
  code: 'Bad Request',
  message: `Invalid or empty package name: "${packageName}"`
})

/** @type { (error: unknown) => error is CustomError } */
exports.isCustomError = error => {
  const nameDescriptor = Object.getOwnPropertyDescriptor(error, "name")

  if (nameDescriptor) {
    return customErrorNames.includes(nameDescriptor.value)
  }

  return false
}

/** @type { (customError: CustomError ) => { statusCode: number, message: string }} */
exports.makeErrorFromCustomError = customError => customErrors[customError.name]
