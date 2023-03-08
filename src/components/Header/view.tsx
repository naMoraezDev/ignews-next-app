import Image from "next/image";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import Link from "next/link";

export function HeaderView() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width={110} height={31} />
        <nav>
          <Link href="/" className={styles.active}>
            Home
          </Link>
          <Link href="/posts" prefetch>
            Posts
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
