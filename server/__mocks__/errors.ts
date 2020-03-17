const actualErrors = jest.requireActual('../errors')

export default {
  ...actualErrors,
  isCustomError: jest.fn(),
  makeBadPackageNameError: jest.fn(),
  makeErrorFromCustomError: jest.fn(),
}
