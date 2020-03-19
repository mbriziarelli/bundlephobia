/**
 * @jest-environment jsdom
 */

import React from 'react'
import Results from '.'
import * as PackageName from '../Hooks/usePackageName'
import * as PackageSize from '../Hooks/usePackageSize'
import { Status } from '../Hooks/usePackageSize'
import { render } from '../../utils/test-utils'
import wordings from '../wordings.json'

jest.mock('../Hooks/usePackageName')
jest.mock('../Hooks/usePackageSize')

afterAll(() => {
  jest.unmock('../Hooks/usePackageName')
  jest.unmock('../Hooks/usePackageSize')
})

describe('Results component', () => {
  const spyOnUsePackageName = jest.spyOn(PackageName, 'default')
  const spyOnUsePackageSize = jest.spyOn(PackageSize, 'default')

  beforeEach(() => {
    spyOnUsePackageName.mockClear()
    spyOnUsePackageSize.mockClear()
  })

  it('renders nothing when there is no package name and no package size being fetched', () => {
    spyOnUsePackageName.mockReturnValueOnce(['', (_: string): void => void _])
    spyOnUsePackageSize.mockReturnValueOnce({
      status: Status.sleeping,
    })

    const { container } = render(<Results />)
    const children = container.querySelectorAll('*')

    expect(children).toHaveLength(0)
  })

  it('renders a waiting message when building a package', () => {
    const packageName = 'foo@1.0.0'
    spyOnUsePackageName.mockReturnValueOnce([
      packageName,
      (_: string): void => void _,
    ])
    spyOnUsePackageSize.mockReturnValueOnce({
      status: Status.fetching,
    })

    const { getByText } = render(<Results />)

    getByText(`Building ${packageName}`)
  })

  it('renders package name and sizes when they have been fetched', () => {
    const packageName = 'foo@1.0.0'
    const minifiedSize = 1024
    const gzippedSize = 512
    spyOnUsePackageName.mockReturnValueOnce([
      packageName,
      (_: string): void => void _,
    ])
    spyOnUsePackageSize.mockReturnValueOnce({
      status: Status.received,
      results: { minifiedSize, gzippedSize },
    })

    const { getByText } = render(<Results />)

    getByText(`${packageName} bundle size`)

    getByText('1.0')
    getByText(wordings.kilobytesUnit)
    getByText(wordings.minified)

    getByText('512')
    getByText(wordings.bytesUnit)
    getByText(wordings.minifiedAndGzipped)
  })

  it('renders an error message when building the package has failed', () => {
    const packageName = 'foo@1.0.0'
    const statusCode = 500
    const code = 'TestError'
    const message = 'message'
    spyOnUsePackageName.mockReturnValueOnce([
      packageName,
      (_: string): void => void _,
    ])
    spyOnUsePackageSize.mockReturnValueOnce({
      status: Status.error,
      error: { statusCode, code, message },
    })

    const { getByText } = render(<Results />)

    getByText(`Error building ${packageName}`)

    getByText(`error status ${statusCode}`)
    getByText(code)
    getByText(message)
  })
})
