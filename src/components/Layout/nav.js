import {
  EuiAvatar,
  EuiContextMenu,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiLink,
  EuiPopover,
} from '@elastic/eui'
import Link from 'next/link'
import { useState } from 'react'
import firebase from 'util/firebase'
import useAuth from 'util/useAuth'

const pages = [['Missions', '/missions']]

const Nav = () => {
  const { user } = useAuth()
  const [profileIsOpen, setProfileIsOpen] = useState(false)

  return (
    <EuiHeader
      role="navigation"
      theme="dark"
      sections={[
        {
          items: [
            <EuiHeaderLogo key="logo" iconType="logoAppSearch" href="/" />,
            <EuiHeaderLinks key="links" aria-label="App navigation">
              {pages.map((link, i) => (
                <Link href={link[1]} key={i} passHref>
                  <EuiHeaderLink color="primary">{link[0]}</EuiHeaderLink>
                </Link>
              ))}
            </EuiHeaderLinks>,
          ],
          borders: 'right',
        },
        {
          items: [
            <>
              {user ? (
                <EuiHeaderSectionItemButton key="account" aria-label="Account">
                  <EuiPopover
                    isOpen={profileIsOpen}
                    closePopover={() => setProfileIsOpen(false)}
                    panelPaddingSize="s"
                    button={
                      <EuiAvatar
                        onClick={() => setProfileIsOpen(true)}
                        imageUrl={user.picture}
                        name={user.username}
                        size="s"
                      />
                    }
                  >
                    <EuiContextMenuPanel
                      items={[
                        <EuiContextMenuItem key={1} icon="user">
                          <Link passHref href="/profile">
                            <EuiLink color="text">Your profile</EuiLink>
                          </Link>
                        </EuiContextMenuItem>,
                        <EuiContextMenuItem key={2} icon="push">
                          <EuiLink
                            onClick={(e) => firebase.auth().signOut()}
                            color="text"
                          >
                            Logout
                          </EuiLink>
                        </EuiContextMenuItem>,
                      ]}
                    />
                  </EuiPopover>
                </EuiHeaderSectionItemButton>
              ) : (
                <EuiHeaderLinks key="links" aria-label="App navigation">
                  {[
                    ['Login', '/login'],
                    ['Sign Up', '/signup'],
                  ].map((link, i) => (
                    <Link href={link[1]} key={i} passHref>
                      <EuiHeaderLink color="primary">{link[0]}</EuiHeaderLink>
                    </Link>
                  ))}
                </EuiHeaderLinks>
              )}
            </>,
          ],
        },
      ]}
    />
  )
}

export default Nav
