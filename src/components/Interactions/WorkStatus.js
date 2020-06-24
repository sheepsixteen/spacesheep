import Button from '@atlaskit/button'
import StarOutline from '@atlaskit/icon/glyph/star'
import StarFilled from '@atlaskit/icon/glyph/star-filled'
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu'
import Popup from '@atlaskit/popup'
import { Color, Status } from '@atlaskit/status'
import PropTypes from 'prop-types'
import { useState } from 'react'

const statuses = [
  <Button>Not stared</Button>,
  <Button style={{ backgroundColor: '#FFF0B2' }}>In progress</Button>,
  <Button style={{ backgroundColor: '#79F2C0' }}>Done</Button>,
]

const WorkStatus = ({ interaction, setInteraction, _status }) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false)

  const _update = (ws) => {
    setPopupIsOpen(false)
    setInteraction({ workingStatus: ws })
  }

  if (interaction === null) {
    return <Button isLoading />
  }

  if (_status) {
    return (
      <Button iconBefore={isStarred ? <StarFilled /> : <StarOutline />}>
        {isStarred ? 'Not starred' : 'Starred'}
      </Button>
    )
  }

  const { isStarred } = interaction

  return (
    <Popup
      isOpen={popupIsOpen}
      onClose={() => setPopupIsOpen(false)}
      placement="left-start"
      content={() => (
        <div style={{ width: '10rem' }}>
          <MenuGroup>
            <Section title="Status">
              {statuses.map((x, i) => (
                <ButtonItem key={i} onClick={(e) => _update(i)}>
                  {x}
                </ButtonItem>
              ))}
            </Section>
          </MenuGroup>
        </div>
      )}
      trigger={(triggerProps) => (
        <div {...triggerProps} onClick={(e) => setPopupIsOpen(true)}>
          {statuses[interaction.workingStatus || 0]}
        </div>
      )}
    />
  )
}

WorkStatus.propTypes = {
  interaction: PropTypes.object,
  setInteraction: PropTypes.func,
  /**
   * If set, overrides and doesn't let user edit (useful for viewing only e.g.
   * on another user's profile page)
   */
  _isStarred: PropTypes.bool,
}

export default WorkStatus
