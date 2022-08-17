import Head from "next/head";
import Layout, { SITE_TITLE } from "../../components/layout";
import { getSortedPostsDate, POST_DIRECTORY } from "../../lib/getMdData";
import PostsCard from "../../components/PostsCard";

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
      <section>
        <ul>
          {allPostsData.map((props) => (
            <PostsCard key={props.id} {...props} />
          ))}
        </ul>
      </section>
    </Layout>
  );
}
