import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
        <Head>
            <title>Create Next App</title>
        </Head>
        {/* Note: The Facebook SDK was only used as a contrived example to show how to add third-party scripts to your application in a performant way.  */}
        <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy='lazyOnload'
            onLoad={() =>
                console.log(`script loaded correctly, window.FB has been populated`)
            }
         />
        <h1>Frist Post</h1>
        <h2>
            <Link href="/">
                <a>Back to home</a>
            </Link>
        </h2>
        </Layout>
    )
}
