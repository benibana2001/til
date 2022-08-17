import styles from "./PostsArticle.module.scss";

export default function PostsArticle({ contentHtml }) {
  return (
    <article className={styles.posts_id}>
      <div
        className={styles.contentHtml}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
