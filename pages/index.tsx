import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'

const Copyright = (): JSX.Element => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <MuiLink color="inherit" href="https://material-ui.com/">
      Your Website
    </MuiLink>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

const Index = (): JSX.Element => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <MuiLink href="/about" color="secondary">
        Go to the about page
      </MuiLink>
      <Copyright />
    </Box>
  </Container>
)

export default Index
