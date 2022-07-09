import Plus from "./Image/Plus";
import Button from "./Button";
import styles from "./scss/ColumnComposer.module.scss";
import { useState, useRef } from "react";
export default function ColumnComposer({ addColumn }) {
  const [content, setContent] = useState("");
  const [isVisible, setVisiblity] = useState(false);
  const textArea = useRef(null);

  const onChangeTextArea = (event) => {
    setContent(event.target.value);
  };
  const showNewColumn = () => {
    setVisiblity(true);
  };
  const onRegister = () => {
    addColumn(content);
    setContent("");
    textArea.current.focus(); // 登録後に新しいtextareaにfocusする
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
            placeholder="このリストのタイトルを入力..."
            ref={textArea}
            className={styles.new_column}
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
          <Button text={"リストを追加"} onClick={onRegister} />
        </div>
      ) : (
        <div className={styles.show_new_column} onClick={showNewColumn}>
          <div className={styles.plus_wrapper}>
            <Plus size={"45"} fillColor={"#F6F6F6"} />
          </div>
        </div>
      )}
    </div>
  );
}
