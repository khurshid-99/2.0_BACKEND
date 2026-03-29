import { tavily as Tavily } from "@tavily/core";

const client = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export async function searchInternate({query}) {
  const results = await client.search(query, {
      maxResults: 5,
    //   searchDepth: "basic",
  });

  return JSON.stringify(results)
}
