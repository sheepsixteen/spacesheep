import { render } from '@testing-library/react'
import { AuthProvider } from 'util/useAuth'

// Wrap with AuthProvider
const App = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: App, ...options })

export * from '@testing-library/react'

// Overwiter render()
export { customRender as render }
