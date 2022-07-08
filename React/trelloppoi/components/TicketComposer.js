import Plus from "./Image/Plus";
import styles from "./scss/TicketComposer.module.scss";
import { useState, useRef } from "react";

export default function TicketComposer({ column, addTicket }) {
  const [content, setContent] = useState("");
  const [isVisible, setVisiblity] = useState(false);
  const textarea = useRef();

  const onChangeTextArea = (event) => {
    setContent(event.target.value);
  };
  const showNewTicket = () => {
    setVisiblity(true);
  };
  const onRegister = () => {
    addTicket(column, {
      content,
      consume: 0,
      estimate: 0,
    });
    setContent("");
  };
  const onKeyDownEnter = (func) => (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.nativeEvent.preventDefault();
      func();
    }
  };
  return (
    <div className={styles.container}>
      {isVisible ? (
        <div>
          <textarea
            placeholder="このチケットのタイトルを入力..."          
            className={styles.new_ticket}
            ref={textarea}
            value={content}
            onChange={onChangeTextArea}
            onKeyDown={onKeyDownEnter(onRegister)}
            onBlur={() => setVisiblity(false)}
            autoFocus
          ></textarea>
          <div className={styles.register_new_ticket} onClick={onRegister}>
            <div>チケットを追加</div>
          </div>
        </div>
      ) : null}
      <div className={styles.show_new_ticket} onClick={showNewTicket}>
        <div className={styles.plus_wrapper}>
          <Plus size={"24"} fillColor={"#dddddd"} />
        </div>
      </div>
    </div>
  );
}
