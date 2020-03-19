/**
 * @jest-environment jsdom
 */

import React from 'react'
import * as Router from 'next/router'
import Page from '..'
import { render } from '../../utils/test-utils'

describe('Main page', () => {
  const spyOnUseRouter = jest.spyOn(Router, 'useRouter')

  it('renders the title and best line', () => {
    const router = ({ query: {} } as unknown) as Router.NextRouter
    spyOnUseRouter.mockReturnValue(router)

    const { getByText } = render(<Page />)

    getByText('bundlephobia')
    getByText('find the cost of adding a npm package to your bundle')
  })
})
