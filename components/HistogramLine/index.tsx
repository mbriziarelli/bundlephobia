import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: (props: { dotted: boolean }) => ({
      flexGrow: 1,
      borderBottom: `1px ${props.dotted ? 'dotted' : 'solid'} ${
        theme.palette.grey[500]
      }`,
      height: 0,
    }),
    caption: {
      width: '5em',
      height: '1.5em',
      marginRight: '1em',
      fontSize: '0.8em',
    },
  })
)

const HistogramLine: React.FC<{
  caption?: string
  dotted?: boolean
}> = ({ caption = '', dotted = false }) => {
  const classes = useStyles({ dotted })

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Typography
        align="right"
        className={classes.caption}
        component={caption.length > 0 ? 'p' : 'div'}
      >
        {caption}
      </Typography>
      <div className={classes.line}></div>
    </Grid>
  )
}

export default HistogramLine
