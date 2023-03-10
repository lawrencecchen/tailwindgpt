import { useMutation } from "@tanstack/react-query";
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
  const [result, setResult] = useState("");

  const generate = useMutation({
    mutationFn: async (variables: { prompt: string }) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: variables.prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
      }
    },
  });

  function handleSubmit() {
    generate.mutate({ prompt });
  }

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
            Generate Tailwind/React components with ChatGPT
          </h1>
          <div className="my-8">
            <div>
              <AutosizeTextarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="hero section with catchy headline of a data SAAS with get started and learn more"
                className="rounded-md border px-3 py-2 text-lg shadow-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                rows={4}
                cols={80}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 rounded-full bg-black/90 px-8 py-2 text-xl font-medium text-white shadow-lg transition hover:bg-black/80 active:bg-black/70"
            >
              Generate 🪄
            </button>
          </div>
        </main>
        {/* <main>
          <h1 className="max-w-lg text-2xl font-bold text-slate-900 sm:text-4xl">
            Generate Tailwind/React components
          </h1>
        </main> */}
      </div>
    </>
  );
};

export default Home;
