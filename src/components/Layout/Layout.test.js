import { render, screen } from 'test/util'

import Layout from './index'

describe('Layout', () => {
  it("should not crash when some props aren't there", async (done) => {
    render(<Layout />)
    expect(screen).toBeTruthy()
    done()
  })
  it('should be loading when provided a loading value', () => {
    const { getByLabelText } = render(<Layout isLoading />)
    expect(getByLabelText('Loading')).toBeInTheDocument()
  })

  it('should render children properly', () => {
    const { getByTestId } = render(
      <Layout>
        <div data-testid="child"></div>
      </Layout>
    )
    expect(getByTestId('child')).toBeInTheDocument()
  })

  it('should have the navbar and footer', () => {
    const { getByRole } = render(<Layout />)
    expect(getByRole('contentinfo')).toBeInTheDocument()
    expect(getByRole('navigation')).toBeInTheDocument()
  })
})
