import Logo from 'components/Logo'
import Link from 'next/link'
import Button from '@atlaskit/button'
import { useAuth, useAuthLoading } from 'util/useAuth'
import Avatar, { Skeleton } from '@atlaskit/avatar'
import Popup from '@atlaskit/popup'
import Dropdown, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu'
import DropdownMenu from '@atlaskit/dropdown-menu'
import theme from 'styles/theme'
import firebase from 'util/firebase'
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down'
import { ExitingPersistence, SlideIn } from '@atlaskit/motion'

const DesktopNavbar = () => {
  const user = useAuth()
  const isLoading = useAuthLoading()

  return (
    <>
      <div className="start">
        <Link href="/">
          <a>
            <Logo width="100%" />
          </a>
        </Link>
      </div>
      <div className="links primary-links">
        <Link href="/missions" passHref>
          <a className="link">Missions</a>
        </Link>
      </div>
      <div className="links secondary-links">
        {user ? (
          <DropdownMenu
            trigger={
              <Button appearance="subtle-link">
                <Avatar appearance="square" size="small" src={user.picture} />
                <ChevronDownIcon primaryColor="white" />
              </Button>
            }
            position="bottom right"
          >
            <DropdownItemGroup>
              <p style={{ padding: '16px', color: theme.colors.text }}>
                Signed in as <b>{user.username}</b>
              </p>
              <Link href={'/' + user.username} passHref>
                <DropdownItem>Your profile</DropdownItem>
              </Link>
              <DropdownItem onClick={(e) => firebase.auth().signOut()}>
                Logout
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/signup" passHref>
              <a className="link border">Sign Up</a>
            </Link>
            <Link href="/login" passHref>
              <a className="link">Login</a>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        .start {
          grid-column: 1/2;
          display: flex;
        }

        .links {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          color: white;
        }

        .link {
          color: white;
          padding: 16px 0;
          font-weight: bold;
          letter-spacing: 0.01rem;
          margin-right: 1rem;
          box-sizing: border-box;
        }

        .border {
          border: 1px solid white;
          padding: 6px 12px;
          border-radius: 4px;
          text-decoration: none;
          transition: box-shadow 0.3s ease;
        }

        .border:hover {
          box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
        }

        .link:last-of-type {
          margin-right: 0;
        }

        .secondary-links {
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
}

export default DesktopNavbar
