import PostIndex from "./posts";
import { getSortedPostsDate } from "../lib/posts";

// runs at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostsDate();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return <PostIndex allPostsData={allPostsData} />;
}
