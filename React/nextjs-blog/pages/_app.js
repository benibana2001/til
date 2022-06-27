import '../styles/global.css'
import Layout from "../components/layout";
import variables from "../components/variables.module.scss";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
