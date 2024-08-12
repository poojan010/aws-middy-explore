import env from "@lib/env";
import { functions } from "@functions/index";
import { ServerlessFrameworkConfiguration } from "serverless-schema";

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: "typescript-template",
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
    },
    stage: env.STAGE,
    stages: ["uat", "alpha", "prod"],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: ["serverless-esbuild", "serverless-prune-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "ap-south-1",
    stage: env.STAGE,
    environment: {
      ...env,
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    deploymentBucket: {
      name: "serverless-deployment-bucket-backend",
    },
  },
  functions,
  package: {
    individually: true,
  },
};

module.exports = serverlessConfiguration;
