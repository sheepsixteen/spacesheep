import HomeScreen from 'screens/HomeScreen'
import { render, screen } from 'test/util'

describe('Home screen', () => {
  it('should pass a smoketest', () => {
    render(<HomeScreen />)
    expect(screen).toBeDefined()
  })
})
