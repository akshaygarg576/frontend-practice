const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export async function fetchGifs(query) {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const url = new URL("https://api.giphy.com/v1/gifs/search");
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("q", query);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP invalid:", response.statusText);
    }

    return response.json();
  } catch (e) {
    console.error("error in catch", e);
    throw e;
  }
}
