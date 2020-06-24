import Button from '@atlaskit/button'
import CheckIcon from '@atlaskit/icon/glyph/check'
import CrossIcon from '@atlaskit/icon/glyph/cross'
import EditIcon from '@atlaskit/icon/glyph/edit'
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu'
import Popup from '@atlaskit/popup'
import { colors } from '@atlaskit/theme'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import useAuth from '../util/useAuth'
import { useInteraction } from '../util/useInteraction'

const WorkingStatus = ({
  isInteractive = true,
  status = 0,
  setStatus,
  verbose,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const _update = (ws) => {
    setPopupIsOpen(false)
    setStatus(ws)
  }

  const statuses = [
    {
      label: 'Not started',
      elemBefore: CrossIcon,
    },
    {
      label: 'In progress',
      elemBefore: EditIcon,
      color: colors.Y400,
    },
    {
      label: 'Done',
      elemBefore: CheckIcon,
      color: colors.G400,
    },
  ]

  if (!isInteractive) {
    return React.createElement(statuses[status].elemBefore, {
      primaryColor: statuses[status].color,
    })
  }

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
                <ButtonItem
                  key={i}
                  elemBefore={React.createElement(x.elemBefore)}
                  onClick={(e) => _update(i)}
                >
                  {x.label}
                </ButtonItem>
              ))}
            </Section>
          </MenuGroup>
        </div>
      )}
      trigger={(triggerProps) => (
        <div {...triggerProps} onClick={(e) => setPopupIsOpen(true)}>
          <Button
            title="Select a mission status"
            appearance={verbose ? 'default' : 'subtle'}
            iconBefore={React.createElement(statuses[status].elemBefore, {
              ...triggerProps,
              primaryColor: statuses[status].color,
            })}
          >
            {verbose && statuses[status].label}
          </Button>
        </div>
      )}
    />
  )
}

WorkingStatus.propTypes = {
  isInteractive: PropTypes.bool,
  status: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired,
  verbose: PropTypes.bool,
}

export default WorkingStatus
