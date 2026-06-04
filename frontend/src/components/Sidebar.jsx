import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div>

        <div className="sidebar-logo">
          🎫 Support CRM
        </div>

        <div className="sidebar-menu">

          {/* ADMIN MENU */}

          {user?.role === "admin" && (
            <>
              <Link to="/dashboard">
                📊 Dashboard
              </Link>

              <Link to="/tickets">
                🎟 Manage Tickets
              </Link>

              <Link to="/create-ticket">
                ➕ Create Ticket
              </Link>
            </>
          )}

          {/* CUSTOMER MENU */}

          {user?.role === "customer" && (
            <>
              <Link to="/create-ticket">
                ➕ Create Ticket
              </Link>

              <Link to="/my-tickets">
                🎫 My Tickets
              </Link>
            </>
          )}

          {/* COMMON MENU */}

          <Link to="/profile">
            👤 Profile
          </Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      <div className="sidebar-footer">
        <p>
          {user?.name || "User"}
        </p>

        <span>
          {user?.role === "admin"
            ? "Administrator"
            : "Customer"}
        </span>
      </div>

    </div>
  );
}

export default Sidebar;