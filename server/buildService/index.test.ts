import { Request, Response } from 'express'
import { PackageStats } from 'package-build-stats'
import * as Errors from '../errors'
import * as GetStats from './getStats'
import getSizeMiddleware from '.'

jest.mock('../errors', () => {
  const actualErrors = jest.requireActual('../errors')

  return {
    ...actualErrors,
    isCustomError: jest.fn(),
    makeBadPackageNameError: jest.fn(),
    makeErrorFromCustomError: jest.fn(),
  }
})

jest.mock('./getStats', () => {
  const actualGetStats = jest.requireActual('./getStats')

  return {
    ...actualGetStats,
    getStats: jest.fn(),
  }
})

afterAll(() => {
  jest.unmock('../errors')
  jest.unmock('./getStats')
})

describe('getSizeMiddleware', () => {
  const spyOnIsCustomError = jest.spyOn(Errors, 'isCustomError')
  const spyOnMakeBadPackageNameError = jest.spyOn(
    Errors,
    'makeBadPackageNameError'
  )
  const spyOnMakeErrorFromCustomError = jest.spyOn(
    Errors,
    'makeErrorFromCustomError'
  )
  const spyOnGetStats = jest.spyOn(GetStats, 'getStats')

  beforeEach(() => {
    spyOnIsCustomError.mockClear()
    spyOnMakeBadPackageNameError.mockClear()
    spyOnMakeErrorFromCustomError.mockClear()
    spyOnGetStats.mockClear()
  })

  describe('when the URL query string contains a valid package name', () => {
    const status = jest.fn()
    const json = jest.fn()

    const req = ({
      url: '/api/size?p=package-name',
    } as unknown) as Request
    const res = ({
      status,
      json,
    } as unknown) as Response

    status.mockImplementation(() => res)

    beforeEach(() => {
      status.mockClear()
      json.mockClear()
    })

    it('responds with the package stats', async () => {
      const stats = ({ prop: 'value' } as unknown) as PackageStats
      spyOnGetStats.mockResolvedValueOnce(stats)

      await getSizeMiddleware(req, res)

      expect(status).toHaveBeenCalledTimes(1)
      expect(status).toHaveBeenCalledWith(200)
      expect(json).toHaveBeenCalledTimes(1)
      expect(json).toHaveBeenCalledWith(stats)
    })

    it('responds with a custom error if a package-build-stats custom error is thrown by getStats', async () => {
      const statusCode = 500
      const code = 'code'
      const message = 'message'
      spyOnGetStats.mockRejectedValueOnce({})
      spyOnIsCustomError.mockReturnValueOnce(true)
      spyOnMakeErrorFromCustomError.mockReturnValueOnce({
        statusCode,
        code,
        message,
      })

      await getSizeMiddleware(req, res)

      expect(status).toHaveBeenCalledTimes(1)
      expect(status).toHaveBeenCalledWith(statusCode)
      expect(json).toHaveBeenCalledTimes(1)
      expect(json).toHaveBeenCalledWith({ code, message })
    })

    it('responds with a generic error if getStats does not throw a package-build-stats custom error', async () => {
      const { statusCode, code, message } = Errors.genericServerError
      spyOnGetStats.mockRejectedValueOnce({})
      spyOnIsCustomError.mockReturnValueOnce(false)

      await getSizeMiddleware(req, res)

      expect(status).toHaveBeenCalledTimes(1)
      expect(status).toHaveBeenCalledWith(statusCode)
      expect(json).toHaveBeenCalledTimes(1)
      expect(json).toHaveBeenCalledWith({ code, message })
    })
  })

  describe('when the URL query string does not contain a valid package name', () => {
    const status = jest.fn()
    const json = jest.fn()

    const req = ({
      url: '/api/size',
    } as unknown) as Request
    const res = ({
      status,
      json,
    } as unknown) as Response

    status.mockImplementation(() => res)

    beforeEach(() => {
      status.mockClear()
      json.mockClear()
    })

    it('responds with a custom "bad package name" error', async () => {
      const statusCode = 400
      const code = 'code'
      const message = 'message'
      spyOnMakeBadPackageNameError.mockReturnValueOnce({
        statusCode,
        code,
        message,
      })

      await getSizeMiddleware(req, res)

      expect(spyOnMakeBadPackageNameError).toHaveBeenCalledTimes(1)
      expect(spyOnMakeBadPackageNameError).toHaveBeenCalledWith(undefined)
      expect(status).toHaveBeenCalledTimes(1)
      expect(status).toHaveBeenCalledWith(statusCode)
      expect(json).toHaveBeenCalledTimes(1)
      expect(json).toHaveBeenCalledWith({ code, message })
    })
  })
})
