import PropTypes from 'prop-types'

import Nav from './nav'

const GlobalLayout = (props) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  )
}

GlobalLayout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default GlobalLayout
