import Head from "next/head";
import { createClient } from "../../../prismicio";
import styles from "./styles.module.scss";

export default function Posts({ page }) {
  console.log(page);
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2023</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2023</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2023</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const page = await client.getAllByType("post");

  return {
    props: {
      page,
    },
  };
}
