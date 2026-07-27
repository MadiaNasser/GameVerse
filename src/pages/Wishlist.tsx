import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Game = {
  _id: string;
  title: string;
  genre: string;
  platform: string;
  image: string;
  rating: number;
};

function Wishlist() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const getGames = async () => {
    try {
      const response = await axios.get<Game[]>(
        "http://localhost:5001/games"
      );

      setGames(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const removeGame = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this game?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/games/${id}`);

      setGames((prev) =>
        prev.filter((game) => game._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete game.");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Games</h1>
          <p>Your saved games</p>
        </div>

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="empty-wishlist">
          <h2>No saved games yet</h2>

          <Link to="/" className="browse-games-button">
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {games.map((game) => (
            <div
              className="wishlist-card"
              key={game._id}
            >
              <Link
                to={`/game/${game._id}`}
                className="wishlist-card-link"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="wishlist-image"
                />

                <div className="wishlist-card-content">
                  <h2>{game.title}</h2>
                  <p>{game.genre}</p>
                  <p>{game.platform}</p>
                  <p>⭐ {game.rating}</p>
                </div>
              </Link>

              <button
                className="remove-wishlist-button"
                onClick={() => removeGame(game._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;