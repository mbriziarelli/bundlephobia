import { CustomErrorName } from 'package-build-stats'
import customErrors from './customErrors'
import {
  makeBadPackageNameError,
  makeErrorFromCustomError,
  isCustomError,
} from '.'

describe('errors module', () => {
  describe('makeBadPackageNameError function', () => {
    it('returns a BadRequest error with message containing the bad package name', () => {
      const error = makeBadPackageNameError('error')
      expect(error).toMatchSnapshot()
    })
  })
  describe('makeErrorFromCustomError function', () => {
    it('returns the corresponding server error from the custom error', () => {
      Object.keys(customErrors).forEach(key => {
        expect(
          makeErrorFromCustomError({
            name: key as CustomErrorName,
            originalError: new Error(),
          })
        ).toBe(customErrors[key as CustomErrorName])
      })
    })
  })
  describe('isCustomError function', () => {
    it('returns true if the given parameter is a custom error', () => {
      Object.keys(customErrors).forEach(key => {
        expect(
          isCustomError({ name: customErrors[key as CustomErrorName].code })
        ).toBe(true)
      })
    })
    it('returns false if the given parameter is an object without the "name" property', () => {
      expect(isCustomError({})).toBe(false)
    })
    it('returns false if the given parameter is a primitive value', () => {
      ;[null, undefined, 0, 'string', false].forEach(value => {
        expect(isCustomError(value)).toBe(false)
      })
    })
  })
})
