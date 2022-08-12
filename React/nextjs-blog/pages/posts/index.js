import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import Layout, { SITE_TITLE } from "../../components/layout";
import styles from "../../components/contents.module.scss";
import { getSortedPostsDate, POST_DIRECTORY } from "../../lib/getMdData";

// runs at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostsDate(POST_DIRECTORY);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function PostIndex({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`${styles.contents} ${styles.posts}`}>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
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
          ))}
        </ul>
      </section>
    </Layout>
  );
}
