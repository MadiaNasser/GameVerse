import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("gameverseUser") || "{}"
  );

  const wishlist = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Wishlist Games:</strong> {wishlist.length}
          </p>
        </div>

        <div className="profile-buttons">
          <Link to="/wishlist" className="profile-button">
            My Wishlist
          </Link>

          <Link to="/" className="profile-button">
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;