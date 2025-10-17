import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/community/header";
import Post from "@/community/post"; // make sure this file exists

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="interiit" />
      </Head>

      <Header />
      <main>
        <Post />
      </main>
    </>
  );
};

export default Home;
