/**
 * @jest-environment jsdom
 */

import axios from 'axios'
import { wait } from '@testing-library/react'
import usePackageSize, { Status, PackageSizes } from './usePackageSize'
import { testHook } from '../../utils/test-hook'
import { ServerError } from 'bundlephobia-errors'

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn(),
}))

afterAll(() => {
  jest.unmock('axios')
})

describe('usePackageSize hook', () => {
  describe('when package name is the empty string', () => {
    it('the status is "sleeping"', () => {
      let status: Status | null = null

      testHook(() => {
        const result = usePackageSize('')
        status = result.status
      })

      expect(status).toBe(Status.sleeping)
    })
  })
  describe('when the package name is not the empty string', () => {
    const packageName = 'foo@1.0.0'
    const spyOnGet = jest.spyOn(axios, 'get')

    beforeEach(() => {
      spyOnGet.mockClear()
    })

    it('fetches then returns the package size', async () => {
      const returnedSizes = { size: 1024, gzip: 512 }
      const fakeAxiosResponse = { data: returnedSizes }
      const fakeAxios = Promise.resolve(fakeAxiosResponse)

      let status: Status | null = null
      let sizes: PackageSizes | null = null

      spyOnGet.mockImplementationOnce(() => fakeAxios)

      testHook(() => {
        const result = usePackageSize(packageName)
        status = result.status

        if (result.status === Status.received) {
          sizes = result.results
        }
      })

      expect(status).toBe(Status.fetching)
      await wait(() => expect(fakeAxios).resolves.toEqual(fakeAxiosResponse))

      expect(status).toBe(Status.received)
      expect(sizes).toEqual({
        minifiedSize: returnedSizes.size,
        gzippedSize: returnedSizes.gzip,
      })
    })

    it('returns an error when there was a problem building the package', async () => {
      const httpStatus = 500
      const returnedError = { code: 'TestError', message: 'message' }
      const fakeAxiosError = {
        response: { status: httpStatus, data: returnedError },
      }
      const fakeAxios = Promise.reject(fakeAxiosError)

      let status: Status | null = null
      let error: ServerError | null = null

      spyOnGet.mockImplementationOnce(() => fakeAxios)

      testHook(() => {
        const result = usePackageSize(packageName)
        status = result.status

        if (result.status === Status.error) {
          error = result.error
        }
      })

      expect(status).toBe(Status.fetching)
      await wait(() => expect(fakeAxios).rejects.toEqual(fakeAxiosError))

      expect(status).toBe(Status.error)
      expect(error).toEqual({
        statusCode: httpStatus,
        code: returnedError.code,
        message: returnedError.message,
      })
    })
  })
})
