import Plus from "./Image/Plus";
import styles from "./scss/ColumnComposer.module.scss";
import { useState, useRef } from "react";
export default function ColumnComposer() {
  return (
    <div className={styles.container}>
      <div>
        <textarea></textarea>
      </div>
      <div className={styles.show_new_column}>
        <div className={styles.plus_wrapper}>
          <Plus size={"45"} fillColor={"#F6F6F6"} />
        </div>
      </div>
    </div>
  );
}
