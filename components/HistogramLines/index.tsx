import React from 'react'
import HistogramLine from '../HistogramLine'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    growing: {
      flexGrow: 1,
    },
  })
)

const HistogramLines: React.FC<{ captions: string[] }> = ({ captions }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignContent="center"
      className={classes.growing}
    >
      {captions.map(caption => (
        <HistogramLine key={caption} caption={caption} dotted />
      ))}
      <HistogramLine />
    </Grid>
  )
}

export default HistogramLines
