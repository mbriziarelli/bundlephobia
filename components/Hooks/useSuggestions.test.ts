/**
 * @jest-environment jsdom
 */

import * as Axios from 'axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore - waitFor() is not yet in the TypeScript d.ts for @testing-library/react
import { waitFor } from '@testing-library/react'
import useSuggestions from './useSuggestions'
import { testHook } from '../../utils/test-hook'

describe('useSuggestion hook', () => {
  describe('when package name is not an empty string', () => {
    const spyOnGet = jest.spyOn(Axios.default, 'get')

    beforeEach(() => {
      spyOnGet.mockClear()
    })

    it('returns the API response if everything is OK', async () => {
      const receivedSuggestions = { data: [{ suggestion: true }] }
      const axiosResponse = Promise.resolve(receivedSuggestions)
      spyOnGet.mockImplementationOnce(() => axiosResponse)
      let suggestions: unknown = null

      testHook(() => {
        suggestions = useSuggestions('foo@1.0.0')
      })

      await waitFor(() =>
        expect(axiosResponse).resolves.toEqual(receivedSuggestions)
      )

      expect(suggestions).toEqual(receivedSuggestions.data)
    })
    it('returns the empty array if the API returned an error', async () => {
      const axiosResponse = Promise.reject(false)
      spyOnGet.mockImplementationOnce(() => axiosResponse)
      let suggestions: unknown = null

      testHook(() => {
        suggestions = useSuggestions('foo@1.0.0')
      })

      await waitFor(() => expect(axiosResponse).rejects.toEqual(false))

      expect(suggestions).toBeInstanceOf(Array)
      expect(suggestions).toHaveLength(0)
    })
  })
  describe('when the trimmed package name is an empty string', () => {
    it('returns the empty array', () => {
      let suggestions: unknown = null

      testHook(() => {
        suggestions = useSuggestions(''.repeat(4))
      })

      expect(suggestions).toBeInstanceOf(Array)
      expect(suggestions).toHaveLength(0)
    })
  })
  describe('when package name is an empty string', () => {
    it('returns the empty array', () => {
      let suggestions: unknown = null

      testHook(() => {
        suggestions = useSuggestions('')
      })

      expect(suggestions).toBeInstanceOf(Array)
      expect(suggestions).toHaveLength(0)
    })
  })
})
