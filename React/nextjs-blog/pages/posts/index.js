import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import Layout, { SITE_TITLE } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
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
      <section className="">
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
