import theme from "styles/theme"
import { fontSize } from "@atlaskit/theme"

const Tag = ({ text }) => {
  return (
    <div className='tag'>
      {text}

      <style jsx>{`
      .tag {
        font-size: ${fontSize()}px;
        font-weight: normal;
        display: inline-block;
        padding: .25em .5em;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        color: ${theme.colors.text};
        background-color: #eee;
        border-radius: 4px;
      }
      .tag + .tag {
        margin-left: .5rem;
      }
        `}</style>
    </div>
  )
}

export default Tag
