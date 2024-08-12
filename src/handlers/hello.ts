import middy from "@middy/core";
import { response } from "@lib/api-gateway";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import jsonBodyParser from "@middy/http-json-body-parser";

const helloHandler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  return response(200, {
    message:
      // eslint-disable-next-line max-len
      "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
    input: event,
  });
};

export const handler = middy()
  .before(async (request: any) => {
    console.log("before", request);
  })
  .after(async (request) => {
    console.log("after", request);
  })
  .onError(async (request) => {
    console.log("onError", request);
  })
  .handler(helloHandler)
  .use(jsonBodyParser());
