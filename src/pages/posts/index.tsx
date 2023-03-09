import Head from "next/head";
import { RichText } from "prismic-dom";
import { createClient } from "../../../prismicio";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const { data: session } = useSession();

  function handlePostPaths(post: Post) {
    if (session?.activeSubscription) {
      return `/posts/${post.slug}`;
    } else {
      return `/posts/preview/${post.slug}`;
    }
  }
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={handlePostPaths(post)}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const results = await client.getAllByType("post");

  const posts = results.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find((content) => content.type === "paragraph")?.text ??
      "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));

  return {
    props: {
      posts,
    },
  };
}
