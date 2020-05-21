import Star from '../Star'
import WorkingStatus from '../WorkingStatus'
import { ButtonGroup } from '@atlaskit/button'
import { useInteraction } from '../../util/useInteraction'
import { useState, useEffect } from 'react'
import { firestore } from 'firebase'
import { useAuth } from '../../util/useAuth'
import InlineMessage from '@atlaskit/inline-message'
import Link from 'next/link'

export default ({ eid, uid, isInteractive = true, verbose }) => {
  const user = useAuth()
  const [interaction, setInteraction] = useInteraction(eid, uid)

  useEffect(() => {
    console.log(verbose, isInteractive, user)
  }, [verbose, isInteractive, user])

  if (verbose && isInteractive && !user) {
    return (
      <Link href='/login'>
        <a>
          <InlineMessage title='Sign in to interact with this mission' type='info' />
        </a>
      </Link>
    )
  }

  if (interaction === null) {
    return null
  }

  return (
    <>
      <WorkingStatus
        verbose={verbose}
        status={interaction.status}
        setStatus={e => setInteraction({ status: e })}
      />
      <Star
        verbose={verbose}
        isStarred={interaction.isStarred}
        setIsStarred={e => setInteraction({ isStarred: e })}
      />
    </>
  )
}
