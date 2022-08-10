import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const NAME = "whasse";
export const SITE_TITLE = `${NAME} blog`;

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="whasse blog" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <UserHeader />
      <Nav />
      <main>{children}</main>
    </div>
  );
}

function UserHeader() {
  return (
    <header className={styles.userHeader}>
      <Link href="/">
        <a>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={NAME}
          />
        </a>
      </Link>
    </header>
  );
}

function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/posts">
        <a>
          <li>Posts</li>
        </a>
      </Link>
      <Link href="/apps">
        <a>
          <li>Apps</li>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <li>About</li>
        </a>
      </Link>
      <Link href="/others">
        <a>
          <li>Others</li>
        </a>
      </Link>
    </nav>
  );
}
