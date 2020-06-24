import Nav from 'components/Nav'
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from 'test/util'
import useAuth, { mockAuth } from 'util/useAuth'
jest.mock('util/useAuth')

describe('Navbar', () => {
  beforeEach(() => {
    mockAuth.mockClear()
  })

  it('should have the correct role', () => {
    const { getByRole } = render(<Nav />)
    expect(getByRole('navigation')).toBeDefined()
  })

  it('should have correct links', async () => {
    const { getAllByRole, getByText } = render(<Nav />)

    await waitFor(() => getByText('Login'))

    // Home, missions, sign up, login
    expect(getAllByRole('link').length).toBe(4)
  })

  it('should render the little hamburger on mobile', async () => {
    const { getByLabelText } = render(<Nav />)
    act(() => {
      window.innerWidth = 500
      fireEvent(window, new Event('resize'))
    })

    expect(getByLabelText('Toggle navigation')).toBeInTheDocument()
  })

  it('sidebar works opens and closes', async (done) => {
    const { getByLabelText, queryByLabelText } = render(<Nav />)

    act(() => {
      window.innerWidth = 500
      fireEvent(window, new Event('resize'))
      fireEvent.click(getByLabelText('Toggle navigation'))
    })

    // Check aria-expanded is true
    await waitFor(() =>
      expect(
        getByLabelText('Toggle navigation').getAttribute('aria-expanded')
      ).toBe('true')
    )

    // Check the "close drawer" button is there
    expect(getByLabelText('Close drawer')).toBeInTheDocument()

    // Check "Pages" and "Profile" sections are there
    expect(getByLabelText('Pages')).toBeInTheDocument()
    expect(getByLabelText('Profile')).toBeInTheDocument()

    // Now lets close the drawer
    act(() => {
      fireEvent.click(getByLabelText('Close drawer'))
    })

    await waitForElementToBeRemoved(getByLabelText('Close drawer'))

    // Pages and Profile section should not be there anymore
    expect(queryByLabelText('Pages')).not.toBeInTheDocument()
    expect(queryByLabelText('Profile')).not.toBeInTheDocument()

    // And Toggle navigation button shows the nav is not expanded
    expect(
      getByLabelText('Toggle navigation').getAttribute('aria-expanded')
    ).toBe('false')
    done()
  })

  it('should profile button when logged in', async () => {
    // Mock useAuth to be logged in
    mockAuth.mockReturnValue({
      user: { username: 'testusername' },
      isLoading: false,
    })
    const { container, getByLabelText } = render(<Nav />)

    act(() => {
      window.innerWidth = 1024
      fireEvent(window, new Event('resize'))
    })

    expect(getByLabelText('Profile')).toBeInTheDocument()
  })

  it('shouldn\'t show "log in" when logged in', async () => {
    // Mock useAuth to be logged in
    mockAuth.mockReturnValue({
      user: { username: 'testusername' },
      isLoading: false,
    })

    const { queryByText } = render(<Nav />)

    act(() => {
      window.innerWidth = 1024
      fireEvent(window, new Event('resize'))
    })

    expect(queryByText('Login')).not.toBeInTheDocument()
    expect(queryByText('Sign Up')).not.toBeInTheDocument()
  })

  it('should show a dropdown with some options when logged in', async () => {
    // Mock useAuth to be logged in
    mockAuth.mockReturnValue({
      user: { username: 'testusername' },
      isLoading: false,
    })

    const { getByLabelText, getByText } = render(<Nav />)

    act(() => {
      window.innerWidth = 1024
      fireEvent(window, new Event('resize'))
    })

    fireEvent.click(getByLabelText('Profile'))

    expect(getByText('Logout')).toBeInTheDocument()
    expect(getByText('Your profile')).toBeInTheDocument()
  })

  // TOOD: add test for logout
})
