import {
  EuiHeader,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui'
import Head from 'next/head'
import PropTypes from 'prop-types'

/**
 * A wrapper for (almost) every page in the site.
 */
const Page = ({ children, title, noTitle = false }) => {
  return (
    <EuiPage>
      <Head>
        <title>{title} - SpaceSheep</title>
      </Head>
      <main
        style={{
          width: '95vw',
          maxWidth: '1012px',
          margin: '0 auto',
        }}
      >
        <EuiSpacer />
        {!noTitle && (
          <EuiTitle size="l">
            <h1>{title}</h1>
          </EuiTitle>
        )}

        <EuiSpacer size="m" />

        {children}
      </main>
    </EuiPage>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  /**
   * Page title
   */
  title: PropTypes.string,

  /**
   * Should the component create an <h1> with the title?
   */
  noTitle: PropTypes.bool,
}

export default Page
