export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.length > 0

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'
