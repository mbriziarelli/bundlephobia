import React, { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import HistogramLines from '.'

export default {
  component: HistogramLines,
  title: 'HistogramLines',
}

const captions = ['10000', '8000', '6000', '4000', '2000']

export const Default = (): ReactElement => (
  <HistogramLines captions={captions} />
)

export const Stretched = (): ReactElement => (
  <Grid container direction="column" style={{ height: '450px' }}>
    <HistogramLines captions={captions} />
  </Grid>
)

export const NoCaptions = (): ReactElement => <HistogramLines captions={[]} />
