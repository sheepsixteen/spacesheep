import { useInteraction } from '../modules/useInteraction'
import { useAuth } from '../modules/useAuth'
import { useState, useEffect } from 'react'
import { MenuGroup, Section, ButtonItem } from '@atlaskit/menu'
import Popup from '@atlaskit/popup'
import { colors } from '@atlaskit/theme'
import Button from '@atlaskit/button'

import CrossIcon from '@atlaskit/icon/glyph/cross'
import CheckIcon from '@atlaskit/icon/glyph/check'
import EditIcon from '@atlaskit/icon/glyph/edit'

const WorkingStatus = ({ eid }) => {
  const { user } = useAuth()
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [interaction, setInteraction] = useInteraction(eid)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    if (interaction && interaction.workingStatus) {
      setStatus(interaction.workingStatus)
    } else {
      setStatus(0)
    }
  }, [interaction])

  const _update = ws => {
    setPopupIsOpen(false)
    setStatus(ws)
    setInteraction({ workingStatus: ws })
  }

  const statuses = [
    {
      label: 'Not started',
      elemBefore: <CrossIcon />
    },
    {
      label: 'In progress',
      elemBefore: <EditIcon />,
      style: {
        backgroundColor: colors.Y75
      }
    },
    {
      label: 'Done',
      elemBefore: <CheckIcon />,
      style: {
        backgroundColor: colors.G100
      }
    }
  ]

  if (!user) {
    return null
  }

  return (
    <Popup
      isOpen={popupIsOpen}
      onClose={() => setPopupIsOpen(false)}
      placement='left-start'
      content={() => (
        <div style={{ width: '10rem' }}>
          <MenuGroup>
            <Section title='Status'>
              {statuses.map((x, i) => (
                <ButtonItem
                  key={i}
                  elemBefore={x.elemBefore}
                  onClick={e => _update(i)}
                >
                  {x.label}
                </ButtonItem>
              ))}
            </Section>
          </MenuGroup>
        </div>
      )}
      trigger={triggerProps => (
        <Button
          {...triggerProps}
          onClick={e => setPopupIsOpen(!popupIsOpen)}
          iconBefore={statuses[status].elemBefore}
          style={statuses[status].style}
        >
          {statuses[status].label}
        </Button>
      )}
    />
  )
}

export default WorkingStatus
