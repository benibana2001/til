import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import Layout, { SITE_TITLE } from "../../components/layout";
import styles from "../../components/contents.module.scss";
import { getSortedPostsDate } from "../../lib/posts";

// runs at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostsDate();
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
                <small>
                  <Date dateString={date} />
                </small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
