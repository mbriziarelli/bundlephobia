import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '4px',
      userSelect: 'none',
    },
    tagline: {
      color: 'grey',
      fontWeight: 300,
      userSelect: 'none',
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.logo}
      >
        bundlephobia
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="center"
        className={classes.tagline}
      >
        find the cost of adding a npm package to your bundle
      </Typography>
    </>
  )
}

export default Header
