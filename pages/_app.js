import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    black: '#081127',
    primary: '#FCC00C'
  }
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
