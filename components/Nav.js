import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import firebase from '../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Button from '@atlaskit/button'
import useWindowSize from '../modules/useWindowSize'
import MenuIcon from '@atlaskit/icon/glyph/menu'
import CrossIcon from '@atlaskit/icon/glyph/cross'
import { useState } from 'react'
import Link from 'next/link'
import { MenuGroup, Section, ButtonItem } from '@atlaskit/menu'
import Popup from '@atlaskit/popup'

const Nav = ({ links }) => {
  // TODO: handle error
  const [user, initialising] = useAuthState(firebase.auth())
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [popupIsOpen, setPopupIsOpen] = useState(false)

  return (
    <Navbar>
      <NavbarMain>
        <Left>
          <Link href='/'>
            <a>
              <img src='/sheep.png' alt='SpaceSheep Logo' />
            </a>
          </Link>
        </Left>

        <Right>
          {
            width < '690'
              ? (
                <>
                  {
                    isOpen
                      ? <div onClick={e => setIsOpen(false)}><CrossIcon /></div>
                      : <div onClick={e => setIsOpen(true)}><MenuIcon /></div>
                  }
                </>
              )
              : (
                <>
                  <Link href='/missions'>
                    <Button appearance='subtle'>Missions</Button>
                  </Link>
                  {
                    initialising
                      ? <></>
                      : user
                        ? (
                          <Popup
                            isOpen={popupIsOpen}
                            onClose={() => setPopupIsOpen(false)}
                            placement='right-start'
                            offset='80px,-30px'
                            content={() => (
                              <div style={{ width: '15rem' }}>
                                <MenuGroup>
                                  <ButtonItem>
                                    Profile
                                  </ButtonItem>
                                  <ButtonItem>
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
                        )
                        : (
                          <>
                            <Link href='/login'>
                              <Button appearance='subtle'>
                                Login
                              </Button>
                            </Link>
                            <Link href='/signup'>
                              <Button href='/signup'>
                                Sign Up
                              </Button>
                            </Link>
                          </>
                        )
                  }
                </>
              )
          }
        </Right>
      </NavbarMain>
      {
        isOpen && (
          <MobileNavbar>
            <MenuGroup>
              <Section title='Pages'>
                <Link href='/missions'>
                  <ButtonItem>
                    Missions
                  </ButtonItem>
                </Link>
                <Link href='/hackathons'>
                  <ButtonItem description='Coming soon' isDisabled>
                    Hackathons
                  </ButtonItem>
                </Link>
                <Link href='/work-experience'>
                  <ButtonItem description='Coming soon' isDisabled>
                    Work Experience
                  </ButtonItem>
                </Link>
              </Section>
              <Section title='Account' hasSeparator>
                {
                  user
                    ? (
                      <>
                        <Link href='/profile'>
                          <ButtonItem elemAfter={<Avatar src={user.photoURL} />}>
                            {user.displayName}
                          </ButtonItem>
                        </Link>
                        <ButtonItem onClick={e => firebase.auth().signOut()}>
                          Logout
                        </ButtonItem>
                      </>
                    )
                    : (
                      <>
                        <Link href='/signup'>
                          <ButtonItem>
                            Sign up
                          </ButtonItem>
                        </Link>
                        <Link href='/login'>
                          <ButtonItem>
                            Login
                          </ButtonItem>
                        </Link>
                      </>
                    )
                }
              </Section>
            </MenuGroup>
          </MobileNavbar>
        )
      }
    </Navbar>
  )
}

const Navbar = styled.nav`
  border-bottom: 1px solid #eee;
`

const NavbarMain = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 95vw;
  max-width: 1690px;
  padding: 1rem;

  display: flex;
`

const MobileNavbar = styled(NavbarMain)`
  padding: 0 0 1rem 0;
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: .3rem;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  a {
    margin-right: .3rem;
  }
`
const Left = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Nav
