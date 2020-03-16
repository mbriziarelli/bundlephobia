import React, { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ResultsTitle from './ResultsTitle'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(4),
    minHeight: 300,
    borderColor: 'lightgray',
    borderTop: '1px solid',
  },
}))

interface Props {
  title: string
}

const ResultsBox: React.FC<Props> = ({ title, children }): ReactElement => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="row"
      item
      justify="center"
      alignContent="center"
      alignItems="center"
      md={6}
      xs={12}
      className={classes.container}
    >
      <ResultsTitle>{title}</ResultsTitle>
      <Grid xs={12} container item justify="center" className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}

export default ResultsBox
