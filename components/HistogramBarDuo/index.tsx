import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import HistogramBar, { HistogramBarProps } from '../HistogramBar'

export interface HistogramBarDuoProps {
  minified: HistogramBarProps
  gzippedAndMinified: HistogramBarProps
  caption: string
  error: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftBar: {
      paddingRight: theme.spacing(2),
    },
  })
)

const HistogramBarDuo: React.FC<HistogramBarDuoProps> = () => {
  const classes = useStyles()

  return null
}

export default HistogramBarDuo
