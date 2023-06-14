import Fastify from "fastify";
import "dotenv/config";

import { askGpt } from "./chat-gpt.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  const question = (request.query as any).q;

  if (question === undefined) {
    reply.type("application/json").code(400);
    return { error: "Missing query parameter `q`" };
  }

  reply.type("application/json").code(200);
  const output = await askGpt(question);
  return { hello: output };
});

fastify.listen(
  { port: (process.env.PORT as any as number) ?? 3000, host: "0.0.0.0" },
  (err, _address) => {
    if (err) throw err;
    // Server is now listening on ${address}
  }
);
