import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [password, setPassword] =
    useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setUser(loggedUser);

    if (loggedUser) {
      setName(loggedUser.name);
    }
  }, []);

  const updateProfile = async () => {
    try {
      const res = await axios.put(
        `https://support-crm-472e.onrender.com/api/auth/profile/${user.id}`,
        {
          name,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile Updated");

      setUser(res.data.user);

      setPassword("");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>My Profile</h1>

        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>
            New Password
          </label>

          <input
            type="password"
            placeholder="Leave blank if unchanged"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          className="login-btn"
          onClick={updateProfile}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Profile;