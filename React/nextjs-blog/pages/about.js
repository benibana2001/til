import Head from "next/head";
import Layout, { SITE_TITLE } from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  );
}
