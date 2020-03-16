import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { ServerError } from 'bundlephobia-errors'
import ResultsBox from './ResultsBox'

const useStyles = makeStyles(() => ({
  statusCode: {
    width: '100%',
    color: 'dimgray',
    textTransform: 'uppercase',
  },
  code: {
    width: '100%',
    color: 'black',
    fontWeight: 'bold',
  },
  message: {
    width: '100%',
    color: 'dimgray',
  },
}))

interface Props {
  packageName: string
  serverError: ServerError
}

const ErrorResults: React.FC<Props> = ({
  packageName,
  serverError,
}): ReactElement => {
  const classes = useStyles()
  return (
    <ResultsBox title={`Error building ${packageName}`}>
      <Grid
        container
        direction="column"
        item
        justify="flex-start"
        xs={12}
        alignContent="center"
      >
        <Typography
          className={classes.statusCode}
          variant="h6"
          gutterBottom
          align="center"
        >
          {`error status ${serverError.statusCode}`}
        </Typography>
        <Typography
          className={classes.code}
          variant="h4"
          gutterBottom
          align="center"
        >
          {serverError.code}
        </Typography>
        <Typography className={classes.message} variant="body1" align="center">
          {serverError.message}
        </Typography>
      </Grid>
    </ResultsBox>
  )
}

export default ErrorResults
