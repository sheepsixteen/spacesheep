module.exports = {
  collectCoverageFrom: ['**/*.js', '!**/*.d.ts', '!**/node_modules/**'],
  extraGlobals: ['Uint8Array', 'ArrayBuffer'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}
