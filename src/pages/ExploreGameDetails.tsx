import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type RawgGameDetails = {
  id: number;
  name: string;
  background_image: string | null;
  description_raw: string;
  rating: number;
  genres: {
    id: number;
    name: string;
  }[];
  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
};

function ExploreGameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<RawgGameDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_RAWG_API_KEY;

        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}`,
          {
            params: {
              key: apiKey,
            },
          }
        );

        setGame(response.data);
      } catch (error) {
        console.error(error);
        setError("Game not found.");
      } finally {
        setLoading(false);
      }
    };

    getGameDetails();
  }, [id]);

  const handleAddGame = async () => {
    if (!game) return;

    try {
      setSaving(true);

      await axios.post("http://localhost:5001/games", {
        title: game.name,
        genre:
          game.genres.length > 0
            ? game.genres.map((g) => g.name).join(", ")
            : "Unknown",
        platform:
          game.platforms.length > 0
            ? game.platforms.map((p) => p.platform.name).join(", ")
            : "Unknown",
        image: game.background_image,
        rating: game.rating,
      });

      alert("Game added successfully!");

      navigate("/wishlist");
    } catch (error) {
      console.error(error);
      alert("Failed to add game.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !game) {
    return (
      <div className="details-page">
        <h2>{error}</h2>

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
          src={game.background_image || ""}
          alt={game.name}
          className="details-image"
        />

        <div className="details-content">
          <h1>{game.name}</h1>

          <div className="details-info">
            <div className="info-box">
              <span>🎮 Genre</span>
              <strong>
                {game.genres.map((g) => g.name).join(", ")}
              </strong>
            </div>

            <div className="info-box">
              <span>🖥 Platform</span>
              <strong>
                {game.platforms
                  .map((p) => p.platform.name)
                  .join(", ")}
              </strong>
            </div>

            <div className="info-box">
              <span>⭐ Rating</span>
              <strong>{game.rating}</strong>
            </div>
          </div>

          <p style={{ marginTop: "20px" }}>
            {game.description_raw}
          </p>

          <button
            onClick={handleAddGame}
            disabled={saving}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {saving ? "Adding..." : "Add to My Games"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExploreGameDetails;