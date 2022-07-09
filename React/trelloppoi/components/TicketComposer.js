import Plus from "./Image/Plus";
import styles from "./scss/TicketComposer.module.scss";
import { useState, useRef } from "react";
import Button from "./Button";

export default function TicketComposer({ column, addTicket }) {
  const [content, setContent] = useState("");
  const [isVisible, setVisiblity] = useState(false);
  const textArea = useRef(null);

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
    textArea.current.focus();
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
            ref={textArea}
            className={styles.new_ticket}
            value={content}
            onChange={onChangeTextArea}
            onKeyDown={onKeyDownEnter(onRegister)}
            onBlur={(event) => {
              const blurTarget = event.relatedTarget;
              if (!blurTarget) {
                setVisiblity(false);
              }
            }}
            autoFocus
          ></textarea>
          <Button text={"チケットを追加"} onClick={onRegister} />
        </div>
      ) : (
        <div className={styles.show_new_ticket} onClick={showNewTicket}>
          <div className={styles.plus_wrapper}>
            <Plus size={"24"} fillColor={"#dddddd"} />
          </div>
        </div>
      )}
    </div>
  );
}
