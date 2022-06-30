import styles from "./Button.module.css";

export function Button({ text }) {
  return (
    <button type="button" className={styles.error}>
      {text}
    </button>
  );
}
