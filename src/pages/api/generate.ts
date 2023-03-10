import { env } from "~/env.mjs";
import { OpenAIStream, OpenAIStreamPayload } from "~/utils/OpenAIStream";
import { z } from "zod";

export const examplesResponseSchema = z.object({
  ids: z.array(z.array(z.string())),
  embeddings: z.null(),
  documents: z.array(z.array(z.string())),
  metadatas: z.array(z.array(z.object({ description: z.string() }))),
  distances: z.array(z.array(z.number())),
});

export const config = {
  runtime: "edge",
};

export async function getExamples(opts: { prompt: string }) {
  return await fetch(
    `${env.API_URL}/examples?prompt=${encodeURIComponent(opts.prompt)}`
  )
    .then((res) => res.json())
    .then(examplesResponseSchema.parse);
}

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const fullPrompt = `Generate Tailwind code with React.
`;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: fullPrompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
