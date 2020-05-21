import theme from 'styles/theme'

const Item = (props) => (
  <div className="card-item">
    {props.children}
    <style jsx>{`
      .card-item {
        border-bottom: 1px solid ${theme.colors.border};
        padding: 12px;
      }
      .card-item:last-of-type {
        border-bottom: none;
      }
    `}</style>
  </div>
)

export default Item
