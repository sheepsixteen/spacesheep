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

const Nav = ({ links }) => {
  const [user, initialising, error] = useAuthState(firebase.auth())
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Navbar>
      <NavbarMain>
        <Left href='/'>
          <img src='/sheep.png' alt='SpaceSheep Logo' />
        </Left>

        <Right>
          {
            width < '690'
              ? <>
                {
                  isOpen
                    ? <div onClick={e => setIsOpen(false)}><CrossIcon /></div>
                    : <div onClick={e => setIsOpen(true)}><MenuIcon /></div>
                }
              </>
              : <>
                <Button href='/missions' appearance='subtle'>Missions</Button>
                {
                  initialising
                    ? <></>
                    : user
                      ? <Avatar href='/profile' src={user.photoURL} />
                      : <>
                        <Button appearance='subtle' href='/login'>
                      Login
                        </Button>
                        <Button href='/signup'>
                      Sign Up
                        </Button>
                        </>
                }
                </>
          }
        </Right>
      </NavbarMain>
      {
        isOpen && (
          <MobileNavbar>
            <Link href='/missions'>
              <a style={{ paddingLeft: '2rem' }}>
                Missions
              </a>
            </Link>
            {
              user
                ? <>
                  <Link href='/profile'>
                    <a style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={user.photoURL} />
                      <span style={{ marginLeft: '.2rem' }}>
                        {user.displayName}
                      </span>
                    </a>
                  </Link>
                  </>
                : <>
                  <Button appearance='subtle' href='/login'>
                      Login
                  </Button>
                  <Button href='/signup'>
                      Sign Up
                  </Button>
                  </>
            }
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
`
const Bottom = styled.div``

export default Nav
