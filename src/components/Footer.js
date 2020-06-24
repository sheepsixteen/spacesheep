import Button from '@atlaskit/button'
import theme from 'styles/theme'

const items = [
  { title: 'Privacy', href: '/privacy' },
  { title: 'Terms of Service', href: '/terms-of-service' },
  { title: 'About us', href: '/about' },
]

const Footer = () => (
  <footer>
    <p>
      © 2020 <b>Sheep16.org</b>. All Rights Reserved
    </p>
    <div className="container">
      {items.map((item) => (
        <Button
          appearance="link"
          key={item.href}
          href={item.href}
          title={item.title}
        >
          {item.title}
        </Button>
      ))}
    </div>

    <style jsx>
      {`
        footer {
          width: 100%;
          text-align: center;
          padding: 32px 0;
          border-top: 1px solid ${theme.colors.hover};
        }
      `}
    </style>
  </footer>
)

export default Footer
