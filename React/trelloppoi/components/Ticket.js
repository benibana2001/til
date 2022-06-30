import styles from "./Ticket.module.scss"
export default function Ticket({title}) {
  return (
    <div>
      <div className="main">
        <div className={styles.main}>{title}</div>
        <div className="avatar"></div>
      </div>
      <div className="sub"></div>
    </div>
  );
}
