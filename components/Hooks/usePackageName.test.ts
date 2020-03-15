/**
 * @jest-environment jsdom
 */

import * as Router from 'next/router'
import { NextRouter } from 'next/router'
import { testHook } from '../../utils/test-hook'
import usePackageName from './usePackageName'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}))

afterAll(() => {
  jest.unmock('next/router')
})

describe('usePackageName hook', () => {
  const spyOnUseRouter = jest.spyOn(Router, 'useRouter')

  beforeEach(() => {
    spyOnUseRouter.mockClear()
  })

  it('returns the current package name from the query string', () => {
    const p = 'packageName'
    const router = ({ query: { p } } as unknown) as NextRouter
    let packageName = ''

    spyOnUseRouter.mockReturnValueOnce(router)

    testHook(() => {
      const [pName] = usePackageName()
      packageName = pName
    })

    expect(packageName).toBe(p)
  })

  it('returns the empty string if there is no current package name in the query string', () => {
    const router = ({ query: {} } as unknown) as NextRouter
    let packageName = ''

    spyOnUseRouter.mockReturnValueOnce(router)

    testHook(() => {
      const [pName] = usePackageName()
      packageName = pName
    })

    expect(packageName).toBe('')
  })

  it('returns a function updating the the current url with the new package name', () => {
    const p = 'packageName'
    const router = { query: { p }, push: jest.fn() }
    const spyOnPush = jest.spyOn(router, 'push')
    let packageName = ''
    let setPackageName = (_: string): void => void _

    spyOnUseRouter.mockReturnValue((router as unknown) as NextRouter)

    testHook(() => {
      const [pName, setPName] = usePackageName()
      packageName = pName
      setPackageName = setPName
    })

    expect(packageName).toBe(p)

    const newP = 'newPackageName'
    setPackageName(newP)

    expect(spyOnPush).toHaveBeenCalledTimes(1)
    expect(spyOnPush).toHaveBeenNthCalledWith(1, `/?p=${newP}`, undefined, {
      shallow: true,
    })
  })
})
