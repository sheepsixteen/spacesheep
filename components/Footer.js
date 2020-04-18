import styled from 'styled-components'
import Button from '@atlaskit/button'

const items = [
  { title: 'Privacy', href: '/privacy' },
  { title: 'Terms of Service', href: '/terms-of-service' },
  { title: 'About us', href: '/about' }
]

const Footer = () => (
  <FooterContainer>
    <p>© 2020 <b>Sheep16.org</b>. All Rights Reserved</p>
    <LinksContainer>
      {
        items.map(item => (
          <Button appearance='link' key={item.href} href={item.href} title={item.title}>
            {item.title}
          </Button>
        ))
      }
    </LinksContainer>
  </FooterContainer>
)

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
`

const FooterContainer = styled.footer`
  border-top: 1px solid #eee;
  background-color: #f6f6f6;
  padding: 2rem;
  text-align: center;
`

export default Footer
