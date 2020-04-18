import App from 'next/app'
import React from 'react'
import { ProvideAuth } from '../modules/useAuth'
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
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ProvideAuth>
    )
  }
}
