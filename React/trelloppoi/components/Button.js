import styles from "./scss/Button.module.scss";
export default function ({ text, color, backgroundColor, ...props }) {
  const style = {
    color: color || "#ffffff",
    backgroundColor: backgroundColor || "#45a445",
  };
  return (
    <button style={style} className={styles.container} {...props}>
      <span>{text}</span>
    </button>
  );
}
