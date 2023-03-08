import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "./sm.json";

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

export const createClient = (
  config: prismicNext.CreateClientConfig = {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    ...config,
  });

  return client;
};
