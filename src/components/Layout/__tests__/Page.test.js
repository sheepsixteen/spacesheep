import { render } from 'test/util'

import Page from '../Page'

describe('Layout/Page', () => {
  it('should render children (smoketest)', () => {
    const { getByTestId } = render(
      <Page>
        <div data-testid="child" />
      </Page>
    )

    expect(getByTestId('child')).toBeInTheDocument()
  })
})
