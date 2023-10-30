import { Api } from "sst/constructs";

export function API({ stack }) {

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    },
    routes: {
      "GET /count": "packages/functions/src/getCount.main",
      "PUT /count": "packages/functions/src/editCount.main",
      "PUT /contact": "packages/functions/src/createContact.main"
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
