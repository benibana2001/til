import Layout from "../../components/layout";
import Head from "next/head";
import {
  getAllPostIds,
  getPostData,
  POST_DIRECTORY,
} from "../../lib/getMdData";
import PostsArticle from "../../components/PostsArticle";
import PostsCard from "../../components/PostsCard";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PostsCard {...postData} />
      <PostsArticle {...postData} />
    </Layout>
  );
}

/**
 * パスを生成
 * 開発環境ではリクエストがとぶがプロダクション環境ではビルド時のみ実行される
 * https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
 * @returns {Object}
 */
export async function getStaticPaths() {
  const paths = getAllPostIds(POST_DIRECTORY);
  return {
    paths,
    fallback: false,
  };
}
/**
 * propsを渡す
 * @param {*}
 * @returns  {Object}
 */
export async function getStaticProps({ params }) {
  const postData = await getPostData(POST_DIRECTORY, `${params.id}`);
  return {
    props: {
      postData,
    },
  };
}
