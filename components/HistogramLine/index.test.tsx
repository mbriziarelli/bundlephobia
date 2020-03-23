/**
 * @jest-environment jsdom
 */

import React from 'react'
import HistogramLine from '.'
import { render } from '../../utils/test-utils'

describe('HistogramLine component', () => {
  it('displays only the caption if it is provided', () => {
    const caption = 'caption'
    const { getByText, queryAllByText } = render(
      <HistogramLine caption={caption} />
    )

    expect(queryAllByText(/.+/)).toHaveLength(1)
    getByText(caption)
  })
  it('does not display any text if no caption is provided', () => {
    const { queryAllByText } = render(<HistogramLine />)

    expect(queryAllByText(/.+/)).toHaveLength(0)
  })
})
