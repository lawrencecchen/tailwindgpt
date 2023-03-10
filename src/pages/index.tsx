import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AutosizeTextarea from "~/components/AutosizeTextarea";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <Head>
        <title>Tailwind GPT</title>
        <meta name="description" content="Generate Tailwind code." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input type="text" />
        <AutosizeTextarea />
      </div>
    </>
  );
};

export default Home;
