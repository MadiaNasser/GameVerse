import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type RawgGame = {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  genres: {
    id: number;
    name: string;
  }[];
};

type RawgResponse = {
  results: RawgGame[];
};

function Home() {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getGames = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_RAWG_API_KEY;

      const response = await axios.get<RawgResponse>(
        "https://api.rawg.io/api/games",
        {
          params: {
            key: apiKey,
            page_size: 12,
            search: searchValue || undefined,
          },
        }
      );

      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching RAWG games:", error);
      setError("Failed to load games.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const handleSearch = () => {
    getGames(search);
  };

  return (
    <div className="home-page">
      <main className="hero-section">
        <p className="small-title">
          Discover your next favorite game
        </p>

        <h1>
          Explore the world of
          <span> video games</span>
        </h1>

        <p className="hero-text">
          Search for popular games, view their details, and save your favorites.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a game..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <section className="games-section">
          <div className="section-heading">
            <h2>Popular Games</h2>
          </div>

          {loading ? (
            <p>Loading games...</p>
          ) : error ? (
            <p>{error}</p>
          ) : games.length === 0 ? (
            <p>No games found.</p>
          ) : (
            <div className="games-grid">
              {games.map((game) => (
                <Link
                  to={`/explore/${game.id}`}
                  key={game.id}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <article className="game-card">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="game-image"
                      />
                    ) : (
                      <div className="game-image">
                        No image
                      </div>
                    )}

                    <h3>{game.name}</h3>

                    <p>
                      {game.genres.length > 0
                        ? game.genres.map((genre) => genre.name).join(", ")
                        : "No genre"}
                    </p>

                    <p>⭐ {game.rating}</p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;