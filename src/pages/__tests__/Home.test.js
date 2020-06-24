import Home from 'pages'
import { render } from 'test/util'

describe('Home page', () => {
  it('should be coming soon (for now)', () => {
    const { getByRole } = render(<Home />)

    expect(getByRole('heading')).toHaveTextContent('Coming Soon')
  })
})
