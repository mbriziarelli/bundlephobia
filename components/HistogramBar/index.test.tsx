/**
 * @jest-environment jsdom
 */

import React from 'react'
import HistogramBar from '.'
import { render } from '../../utils/test-utils'

describe('HistogramBar component', () => {
  it('displays the caption when provided', () => {
    const caption = 'caption'
    const { getByText } = render(
      <HistogramBar
        value={10}
        maxValue={100}
        maxHeightPixels={100}
        caption={caption}
      />
    )

    getByText(caption)
  })
  it('does not display any text if caption is not provided', () => {
    const { queryAllByText } = render(
      <HistogramBar value={10} maxValue={100} maxHeightPixels={100} />
    )

    expect(queryAllByText(/.+/)).toHaveLength(0)
  })
})
