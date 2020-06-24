// Adds some nice utility expects
import '@testing-library/jest-dom/extend-expect'

// Set process.env.NODE_ENV to 'development'
process.env = Object.assign(process.env, { NODE_ENV: 'development' })

// Stop some atlaskit warnings
console.warn = jest.fn((message) => {
  process.stderr.write(message.substring(0, 60) + '...\n')
})

// Set up firebase mocks
// TODO: move to util/__mocks__
jest.mock('util/firebase', () => {
  const firebasemock = require('firebase-mock')

  const mockauth = new firebasemock.MockAuthentication()
  const mockfirestore = new firebasemock.MockFirestore()
  const mockstorage = new firebasemock.MockStorage()
  const mocksdk = new firebasemock.MockFirebaseSdk(
    null,
    () => {
      mockauth.autoFlush(10)
      return mockauth
    },
    () => {
      mockfirestore.autoFlush(10)
      return mockfirestore
    },
    () => {
      return mockstorage
    },
    null
  )
  return mocksdk
})
