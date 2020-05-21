import Mission from './Card'
import styles from './Mission.module.sass'

export default ({ items }) => {
  if (!items) {
    return null
  }

  return (
    <div className={styles.list}>
      {items.map(x => (
        <Mission key={x.eid} {...x} />
      ))}
    </div>
  )
}
