import '@elastic/eui/dist/eui_theme_amsterdam_light.css'

import GlobalLayout from 'components/Layout/global'
import PropTypes from 'prop-types'
import { AuthProvider } from 'util/useAuth'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </AuthProvider>
  )
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

export default App
