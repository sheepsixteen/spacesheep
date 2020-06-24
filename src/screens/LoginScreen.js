import { EuiButton, EuiTitle } from '@elastic/eui'
import Page from 'components/Layout/Page'
import { FaGithub } from 'react-icons/fa'
import theme from 'styles/theme'
import continueWith from 'util/continueWith'

const LoginScreen = () => {
  return (
    <Page title="Login" noTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EuiTitle size="l">
          <h1>Login</h1>
        </EuiTitle>
        <EuiButton
          iconType="logoGithub"
          onClick={(e) => continueWith('github')}
        >
          Continue with Github
        </EuiButton>
      </div>
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 5rem 2rem;
          max-width: 60em;
          text-align: center;
        }

        .button {
          font-size: 18px;
          line-height: 1.6;
          padding: 8px 16px;
          outline: none;
          border: none;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          transition: box-shadow 0.2s ease;
          cursor: pointer;
        }

        .button:hover {
          box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
        }

        .button span {
          display: block;
          margin-left: 5px;
        }

        .button.github {
          background: ${theme.colors.text};
          color: white;
        }

        h1 {
          font-size: 32px;
          margin-bottom: 2rem;
        }
      `}</style>
    </Page>
  )
}

export default LoginScreen
