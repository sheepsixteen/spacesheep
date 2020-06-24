import { ExitingPersistence, FadeIn, SlideIn } from '@atlaskit/motion'
import { useEffect } from 'react'
import theme from 'styles/theme'
import useAuth from 'util/useAuth'

import useWindowSize from '../../util/useWindowSize'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

const pages = [
  { label: 'Missions', href: '/missions' },
  // { label: 'Hackathons', href: null },
  // { label: 'Work', href: null }
]

const Nav = () => {
  const { width } = useWindowSize()
  const { isLoading } = useAuth()

  return (
    <nav className="navbar">
      <ExitingPersistence exitThenEnter>
        {!isLoading && (
          <FadeIn enterFrom="top" exitTo="top">
            {(props) => (
              <div {...props}>
                <div className="content">
                  {width <= '690' ? <MobileNavbar /> : <DesktopNavbar />}
                </div>
              </div>
            )}
          </FadeIn>
        )}
      </ExitingPersistence>

      <style jsx>
        {`
          .navbar {
            background-color: ${theme.colors.text};
            color: white;
            padding: 0 16px;
            min-height: 52px;
          }

          .content {
            display: grid;
            grid-template-columns: 32px 1fr 1fr;
            min-height: 50px;
            justify-items: end;
            align-items: center;
            grid-gap: 1rem;
          }
        `}
      </style>
    </nav>
  )
}

export default Nav
