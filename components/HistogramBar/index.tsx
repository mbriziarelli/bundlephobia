import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export interface HistogramBarProps {
  value: number
  maxValue: number
  maxHeightPixels: number
  caption?: string
  useSecondaryColor?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: (props: { useSecondaryColor: boolean; heightPixels: number }) => ({
      backgroundColor: props.useSecondaryColor
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
      height: `${props.heightPixels}px`,
    }),
    caption: (props: { useSecondaryColor: boolean }) => ({
      color: props.useSecondaryColor
        ? theme.palette.secondary.contrastText
        : theme.palette.primary.contrastText,
      fontSize: '0.8em',
      padding: theme.spacing(1),
    }),
  })
)

const HistogramBar: React.FC<HistogramBarProps> = ({
  value,
  maxValue,
  maxHeightPixels,
  caption,
  useSecondaryColor = false,
}) => {
  const classes = useStyles({
    useSecondaryColor,
    heightPixels: (value * maxHeightPixels) / maxValue,
  })

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignContent="center"
      className={classes.bar}
    >
      <Typography className={classes.caption}>{caption}</Typography>
    </Grid>
  )
}

export default HistogramBar
