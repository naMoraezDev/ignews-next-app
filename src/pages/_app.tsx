/* eslint-disable @next/next/no-css-tags */
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import "../styles/global.scss";
import "./nprogress.css";
import { getProgressBar } from "../utils";

getProgressBar();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
