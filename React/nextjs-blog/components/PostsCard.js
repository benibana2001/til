import Link from "next/link";
import Date from "./date";
import styles from "./PostsCard.module.scss";
export default function PostsCard({ id, date, title }) {
  return (
    <li className={styles.posts_card}>
      <div>
        <Link href={`/posts/${id}`}>
          <a className={styles.title}>{title}</a>
        </Link>
      </div>
      <div>
        <div className={styles.misc}>
          <Date dateString={date} className={styles.misc} />
        </div>
      </div>
    </li>
  );
}
