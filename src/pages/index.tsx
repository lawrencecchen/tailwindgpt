import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AutosizeTextarea from "~/components/AutosizeTextarea";
import Github from "~/components/GitHub";

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
      <div className="antialiased">
        <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
          <a
            className="mb-5 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-600 shadow-md transition-colors hover:bg-neutral-100"
            href="https://github.com/lawrencecchen/tailwindgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>Star on GitHub</p>
          </a>
          <h1 className="max-w-[708px] text-4xl font-bold text-neutral-900 sm:text-5xl">
            Generate Tailwind/React components using ChatGPT
          </h1>
          {/* <hr className="border-1 h-px bg-neutral-700 dark:bg-neutral-700" /> */}
        </main>
        {/* <main>
          <h1 className="max-w-lg text-2xl font-bold text-slate-900 sm:text-4xl">
            Generate Tailwind/React components
          </h1>
          <AutosizeTextarea />
        </main> */}
      </div>
    </>
  );
};

export default Home;
