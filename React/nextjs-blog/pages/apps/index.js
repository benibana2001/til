import Head from "next/head";
import Link from "next/link";
import Layout, { SITE_TITLE } from "../../components/layout";
import styles from "../../components/contents.module.scss";
import { getSortedPostsDate, APP_DIRECTORY } from "../../lib/getMdData";

// runs at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostsDate(APP_DIRECTORY);
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
      <section className={`${styles.contents} ${styles.apps}`}>
        <ul>
          <li>
            <div className={styles.appImage}></div>
            <div>
              <div className={styles.title}></div>
              <div className={styles.description}></div>
            </div>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
