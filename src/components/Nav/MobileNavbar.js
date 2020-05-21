import Logo from 'components/Logo'
import MenuIcon from '@atlaskit/icon/glyph/menu'
import Drawer from '@atlaskit/drawer'
import { useState } from 'react'
import Button from '@atlaskit/button'
import { MenuGroup, Section, LinkItem } from '@atlaskit/menu'
import { useAuth } from 'util/useAuth'
import Link from 'next/link'
import firebase from 'util/firebase'

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuth()

  return (
    <>
      <div className="start">
        <Link href="/">
          <a>
            <Logo width="100%" />
          </a>
        </Link>
      </div>
      <div className="end">
        <Button
          iconBefore={<MenuIcon primaryColor="white" />}
          onClick={(e) => setIsOpen(!isOpen)}
        />
      </div>

      <Drawer isOpen={isOpen} onClose={(e) => setIsOpen(false)}>
        <MenuGroup>
          <Section title="Pages">
            <Link passHref href="/missions">
              <LinkItem description="Learn through doing">Missions</LinkItem>
            </Link>
          </Section>

          {user ? (
            <Section title="Profile">
              <Link href={'/' + user.username} passHref>
                <LinkItem>Your Profile</LinkItem>
              </Link>
              <LinkItem onClick={e => firebase.auth().signOut()}>Logout</LinkItem>
            </Section>
          ) : (
            <Section title="Profile">
              <Link href="/signup" passHref>
                <LinkItem>Sign up</LinkItem>
              </Link>
              <Link href="/login" passHref>
                <LinkItem>Login</LinkItem>
              </Link>
            </Section>
          )}
        </MenuGroup>
      </Drawer>

      <style jsx>{`
        .start {
          grid-column: 1/2;
        }

        .end {
          padding: 16px 0;
          grid-column: 3/4;
        }
      `}</style>
    </>
  )
}

export default MobileNavbar
