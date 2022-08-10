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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      
      </section>
    </Layout>
  );
}
