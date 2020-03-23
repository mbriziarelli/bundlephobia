import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(4),
      backgroundColor: theme.palette.grey[50],
    },
  })
)

const Center: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="center">
        {children}
      </Grid>
    </div>
  )
}

export default Center
