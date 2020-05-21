import PropTypes from 'prop-types'
import theme from 'styles/theme'

const Hero = ({ title, body }) => (
  <div className="hero">
    <div className="hero-body">
      <h1>{title}</h1>
      <p style={{ marginBottom: '2rem', maxWidth: '30rem' }}>{body}</p>
    </div>

    <style jsx>{`
    .hero {
      min-height: 30vh;
      background-color: ${theme.colors.background};
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .hero-body {
      margin-top: 2rem;
      margin: 2rem auto;
      width: 95vw;
      max-width: 80rem;
      margin-top: 0;
      margin-bottom: 0;
    }
  `}</style>
  </div>
)

Hero.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

export default Hero
