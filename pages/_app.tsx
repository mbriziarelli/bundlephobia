// Copied from https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React, { ReactElement } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'

export default class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }

  render(): ReactElement {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>BundlePhobia</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}
