import styles from "./scss/TicketComposer.module.scss";
import { useState } from "react";

export default function TicketComposer({ column, addTicket }) {
  const [content, setcontent] = useState(null);
  const onChangeTextArea = (event) => {
    console.log(event.target.value);
    setcontent(event.target.value);
  };
  const onClick = () => {
    console.log("onclick");
    console.log(addTicket);
    addTicket(column, {
      content,
      consume: 0,
      estimate: 0,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.ticket}>
        <textarea
          className={styles.content}
          onChange={onChangeTextArea}
        ></textarea>
      </div>
      <div className={styles.addTicket} onClick={onClick}>
        <div>チケットを追加</div>
      </div>
    </div>
  );
}
