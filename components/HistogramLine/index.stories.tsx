import React, { ReactElement } from 'react'
import HistogramLine from '.'

export default {
  component: HistogramLine,
  title: 'HistogramLine',
}

export const Plain = (): ReactElement => <HistogramLine caption="caption" />

export const NoCaptionPlain = (): ReactElement => <HistogramLine />

export const Dotted = (): ReactElement => (
  <HistogramLine caption="caption" dotted />
)

export const NoCaptionDotted = (): ReactElement => <HistogramLine dotted />
