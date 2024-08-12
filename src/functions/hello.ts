import { AwsFunction } from "serverless-schema";

const hello: AwsFunction = {
  handler: "src/handlers/hello.handler",
  events: [
    {
      http: {
        method: "GET",
        path: "/hello",
        cors: true,
      },
    },
  ],
};

export default hello;
