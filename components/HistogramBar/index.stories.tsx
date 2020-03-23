import React, { ReactElement } from 'react'
import HistogramBar from '.'

export default {
  component: HistogramBar,
  title: 'HistogramBar',
}

const value = 50
const maxValue = 100
const maxHeightPixels = 100
const caption = '50 MiB'

export const Default = (): ReactElement => (
  <HistogramBar
    value={value}
    maxValue={maxValue}
    maxHeightPixels={maxHeightPixels}
    caption={caption}
  />
)

export const DefaultWithoutCaption = (): ReactElement => (
  <HistogramBar
    value={value}
    maxValue={maxValue}
    maxHeightPixels={maxHeightPixels}
  />
)

export const SecondaryColor = (): ReactElement => (
  <HistogramBar
    value={value}
    maxValue={maxValue}
    maxHeightPixels={maxHeightPixels}
    caption={caption}
    useSecondaryColor
  />
)

export const SecondaryColorWithoutCaption = (): ReactElement => (
  <HistogramBar
    value={value}
    maxValue={maxValue}
    maxHeightPixels={maxHeightPixels}
    useSecondaryColor
  />
)
