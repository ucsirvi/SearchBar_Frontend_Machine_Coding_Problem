import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [focus, setfocus] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("Cached Result: ", input);
      setResults(cache[input]);
      return;
    }

    console.log("API CALL: ", input);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>Search Bar</h1>

      <div>
        <input
          type="text"
          className="search-bar"
          placeholder="type here...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
        />
      </div>
      {focus && (
        <div className="result-container">
          {results.map((r) => (
            <span key={r.id} className="result">
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
