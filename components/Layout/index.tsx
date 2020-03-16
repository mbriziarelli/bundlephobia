import React, { ReactElement } from 'react'
import { NextPage } from 'next'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Header from '../Header'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
  })
)

const withLayout = (Page: NextPage) => (): ReactElement => {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid xs={12} item>
          <Header />
        </Grid>
        <Grid
          xs={12}
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.container}
        >
          <Page />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withLayout
