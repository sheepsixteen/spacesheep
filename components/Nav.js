import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import firebase from '../modules/firebase'
import { useAuth } from '../modules/useAuth'
import Button from '@atlaskit/button'
import useWindowSize from '../modules/useWindowSize'
import MenuIcon from '@atlaskit/icon/glyph/menu'
import CrossIcon from '@atlaskit/icon/glyph/cross'
import { useState } from 'react'
import Link from 'next/link'
import { MenuGroup, Section, ButtonItem } from '@atlaskit/menu'
import Popup from '@atlaskit/popup'

const pages = [
  { label: 'Missions', href: '/missions' }
  // { label: 'Hackathons', href: null },
  // { label: 'Work', href: null }
]

const Nav = () => {
  const { user, signout } = useAuth()
  const { width } = useWindowSize()

  const [navbarIsOpen, setNavbarIsOpen] = useState(false)
  const [popupIsOpen, setPopupIsOpen] = useState(false)

  return (
    <NavbarContainer>
      <Navbar>
        <Link passHref href='/'>
          <a>
            <img height='32px' src='https://img.icons8.com/doodle/2x/sci-fi.png' alt='SpaceSheep logo' />
          </a>
        </Link>

        <Links>
          {(width < '690') && (
            navbarIsOpen
              ? <div onClick={e => setNavbarIsOpen(false)}><CrossIcon /></div>
              : <div onClick={e => setNavbarIsOpen(true)}><MenuIcon /></div>
          )}

          {(width > '690') && (
            <>
              {pages.map((page, i) => (
                <Link key={i} href={page.href} passHref>
                  <Button appearance='subtle' isDisabled={!page.href}>
                    {page.label}
                  </Button>
                </Link>
              ))}

              {!user && (
                <>
                  <Link passHref href='/login'>
                    <Button appearance='subtle'>
                      Login
                    </Button>
                  </Link>
                  <Link passHref href='/signup'>
                    <Button appearance='primary'>
                      Sign up
                    </Button>
                  </Link>
                </>
              )}

              {user && (
                <Popup
                  isOpen={popupIsOpen}
                  onClose={() => setPopupIsOpen(false)}
                  placement='right-start'
                  offset='80px,-30px'
                  content={() => (
                    <div style={{ width: '15rem' }}>
                      <MenuGroup>
                        <Link passHref href='/profile'>
                          <ButtonItem>
                            Profile
                          </ButtonItem>
                        </Link>
                        <ButtonItem onClick={e => firebase.auth().signOut()}>
                          Logout
                        </ButtonItem>
                      </MenuGroup>
                    </div>
                  )}
                  trigger={triggerProps => (
                    <div
                      {...triggerProps}
                    >
                      <Avatar
                        src={user.photoURL}
                        onClick={() => setPopupIsOpen(!popupIsOpen)}
                      />
                    </div>
                  )}
                />
              )}
            </>
          )}
        </Links>
      </Navbar>

      {/* Mobile Navbar */}
      {(navbarIsOpen && width < '690') && (
        <MenuGroup style={{ backgroundColor: '#f6f6f6' }}>
          <Section title='Pages'>
            {pages.map((page, i) => (
              <Link passHref key={i} href={page.href} passHref>
                <ButtonItem isDisabled={!page.href}>
                  {page.label}
                </ButtonItem>
              </Link>
            ))}
          </Section>

          <Section title='Account' hasSeparator>
            {user ? (
              <>
                <Link passHref href='/profile'>
                  <ButtonItem elemAfter={<Avatar src={user.photoURL} />}>
                    My Profile
                  </ButtonItem>
                </Link>
                <ButtonItem onClick={e => signout()}>
                  Logout
                </ButtonItem>
              </>
            ) : (
              <>
                <Link passHref href='/signup'>
                  <ButtonItem>
                    Sign up
                  </ButtonItem>
                </Link>
                <Link passHref href='/login'>
                  <ButtonItem>
                    Login
                  </ButtonItem>
                </Link>
              </>
            )}
          </Section>
        </MenuGroup>
      )}
    </NavbarContainer>
  )
}

const NavbarContainer = styled.nav`
  border-bottom: 1px solid #eee;
  background-color: #f6f6f6;
`

const Navbar = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 95vw;
  max-width: 1690px;
  padding: 1rem 0;

  display: grid;
  grid-template-columns: 32px auto;
  align-items: center;
`

const Links = styled.div`
  justify-self: end;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: .1rem;
  align-items: center;
`

export default Nav
