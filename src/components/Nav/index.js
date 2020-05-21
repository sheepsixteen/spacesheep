import useWindowSize from '../../util/useWindowSize'
import theme from 'styles/theme'

import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { useAuthLoading, useAuth } from 'util/useAuth'
import { useEffect } from 'react'
import { ExitingPersistence, SlideIn, FadeIn } from '@atlaskit/motion'

const pages = [
  { label: 'Missions', href: '/missions' },
  // { label: 'Hackathons', href: null },
  // { label: 'Work', href: null }
]

const Nav = () => {
  const { width } = useWindowSize()
  const isLoading = useAuthLoading()

  
  return (
    <div className="navbar">
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
    </div>
  )
}

export default Nav
