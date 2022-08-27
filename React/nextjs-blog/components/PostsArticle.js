import styles from "./PostsArticle.module.scss";

export default function PostsArticle({ contentHtml }) {
  return (
    <article className={styles.article}>
      <div
        className={styles.contentHtml}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
