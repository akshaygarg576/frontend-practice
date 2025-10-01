import { useEffect, useState } from "react";
import { SearchBar } from "./components/searchBar/SearchBar";
import { fetchGifs } from "./api/giphy";
import { GifList } from "./gifList/GifList";
import { SearchInput } from "./components/searchInput/SearchInput";

function App() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const fetchData = async () => {
      // make API call
      // fetch
      // loading
      // error
      // empty state

      if (!query.trim()) {
        return;
      }

      try {
        const response = await fetchGifs(query);
        setGifs(response.data);
      } catch (e) {
        console.log("error otuside", e);
        setError("Failed to fetch gifs");
      } finally {
      }
    };

    const timerId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-8">
      <SearchBar
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <GifList gifs={gifs} />
    </div>
  );
}

export default App;
