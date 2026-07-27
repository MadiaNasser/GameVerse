import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type Game = {
  _id: string;
  title: string;
  genre: string;
  platform: string;
  image: string;
  rating: number;
};

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const response = await axios.get<Game>(
          `http://localhost:5001/games/${id}`
        );

        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError("Game not found.");
      } finally {
        setLoading(false);
      }
    };

    getGameDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/games/${id}`);

      alert("Game deleted successfully!");

      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete game.");
    }
  };

  if (loading) {
    return <h2 className="details-loading">Loading...</h2>;
  }

  if (error || !game) {
    return (
      <div className="details-page">
        <h2>{error || "Game not found."}</h2>

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>

      <div className="details-card">
        <img
          src={game.image}
          alt={game.title}
          className="details-image"
        />

        <div className="details-content">
          <h1>{game.title}</h1>

          <div className="details-info">
            <div className="info-box">
              <span>🎮 Genre</span>
              <strong>{game.genre}</strong>
            </div>

            <div className="info-box">
              <span>🖥 Platform</span>
              <strong>{game.platform}</strong>
            </div>

            <div className="info-box">
              <span>⭐ Rating</span>
              <strong>{game.rating}</strong>
            </div>
          </div>

          <button
            onClick={handleDelete}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "crimson",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Delete Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;