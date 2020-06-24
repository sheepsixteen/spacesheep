import Log from 'components/Interactions/Log'
import { render, screen } from 'test/util'

describe('Log', () => {
  const fauxInteraction = {
    id: 'abc',
    eid: 'a',
    uid: 'c',
    username: 'johnsmith123',
    log: 'I am some markdown \n # This is a title \n - bullet \n -point',
  }

  it('should not fail when props are missing', () => {
    render(<Log />)
  })

  it('should return loading when interaction is null', () => {
    const { getByLabelText } = render(<Log interaction={null} />)
    expect(getByLabelText('Loading')).toBeInTheDocument()
  })

  it('should show the interaction when given', () => {
    const { getByText } = render(<Log interaction={fauxInteraction} />)
    expect(getByText('I am some markdown')).toBeInTheDocument()
  })

  it('should show a "enter your log now" button when no interaction is there', () => {
    const { getAllByRole } = render(
      <Log interaction={{}} setInteraction={() => {}} />
    )

    console.log(getAllByRole('button'))
  })
})
