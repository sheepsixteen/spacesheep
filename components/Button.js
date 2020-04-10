import styled from 'styled-components'

const Button = styled.a.attrs(props => ({
  className: 'dib br2 no-underline dim'
}))`
  color: ${props => props.theme.colors.black};
  padding: 12px 16px;
  letter-spacing: 0.03em;
  color: ${props => props.isPrimary ? props.theme.colors.black : ''};
  background-color: ${props => props.isPrimary ? props.theme.colors.primary : '#EEEEEE'};
`

export default Button
