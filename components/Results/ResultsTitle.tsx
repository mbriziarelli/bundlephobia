import React, { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  packageName: {
    display: 'flex',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}))

const ResultsTitle: React.FC = (props): ReactElement => {
  const classes = useStyles()

  return (
    <Typography className={classes.packageName} align="center" variant="h6">
      {props.children}
    </Typography>
  )
}

export default ResultsTitle
