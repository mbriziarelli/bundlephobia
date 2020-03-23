/**
 * @jest-environment jsdom
 */

import React from 'react'
import HistogramLines from '.'
import { render } from '../../utils/test-utils'

describe('HistogramLines component', () => {
  it('displays all the captions if they are provided', () => {
    const captions = [
      'caption1',
      'caption2',
      'caption3',
      'caption4',
      'caption5',
    ]
    const { getByText, queryAllByText } = render(
      <HistogramLines captions={captions} />
    )

    expect(queryAllByText(/.+/)).toHaveLength(captions.length)
    captions.forEach(caption => getByText(caption))
  })
  it('does not display any text if no caption is provided', () => {
    const { queryAllByText } = render(<HistogramLines captions={[]} />)

    expect(queryAllByText(/.+/)).toHaveLength(0)
  })
})
