const useAuth = jest.requireActual('../useAuth')

// This allows tests to alter what will be returned by the provider / hook
export const mockAuth = jest.fn(() => ({ user: null, isLoading: false }))

// Mocking useAuth()
export default () => mockAuth()

export const AuthProvider = useAuth.AuthProvider
