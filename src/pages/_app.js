import '../styles/styles.sass'
import { ProvideAuth, ProvideAuthLoading } from '../util/useAuth'

export default function MyApp ({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ProvideAuthLoading>
        <Component {...pageProps} />
      </ProvideAuthLoading>
    </ProvideAuth>
  )
}
