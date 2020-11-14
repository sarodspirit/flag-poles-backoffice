import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import FastifyJwt from "fastify-jwt";
const server: FastifyInstance = Fastify({});
server.register(FastifyJwt, {
  secret: process.env.JWT_SECRET || "randomSecret",
});
const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/healthcheck", opts, async () => {
  return { status: "ok" };
});
server.post("/token", (_, reply) => {
  const payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["client"],
      "x-hasura-default-role": "client",
      "x-hasura-client-id": "25123b9c-ac73-4b21-a231-1d782c5490a1",
    },
  };
  const token = server.jwt.sign(payload);
  reply.send({ token });
});
const start = async () => {
  try {
    await server.listen(9000, "0.0.0.0");

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;

    server.log.info(`server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
console.log(process.env.JWT_SECRET);
start();
