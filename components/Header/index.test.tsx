/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '../../utils/test-utils'
import Header from '.'

describe('<Header /> component', () => {
  it('renders the component', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })
})
