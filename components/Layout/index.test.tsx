/**
 * @jest-environment jsdom
 */

import React from 'react'
import { NextPage } from 'next'
import { render } from '../../utils/test-utils'
import withLayout from '.'

describe('Layout module', () => {
  it('renders the page', () => {
    const pageContent = 'Page Content'
    const Page: NextPage = () => <span>{pageContent}</span>
    const PageWithLayout = withLayout(Page)
    const { getByText } = render(<PageWithLayout />, {})

    getByText(pageContent)
  })
})
