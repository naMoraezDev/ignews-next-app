import Image from "next/image";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";
import { useRouter } from "next/router";
import Link from "next/link";

export function HeaderView() {
  const { pathname } = useRouter();
  const isPostDetailPage =
    pathname === "/posts/[slug]" || pathname === "/posts/preview/[slug]";

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width={110} height={31} />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            Home
          </ActiveLink>
          {isPostDetailPage ? (
            <Link className={styles.active} href="/posts">
              Posts
            </Link>
          ) : (
            <ActiveLink activeClassName={styles.active} href="/posts">
              Posts
            </ActiveLink>
          )}
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
