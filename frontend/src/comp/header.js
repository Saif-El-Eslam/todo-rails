// this is a header component that has a logo and a logout button

import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      sessionStorage.removeItem("token");
      navigate("/");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <div
          onClick={() => {
            sessionStorage.token ? navigate("/todo") : navigate("/");
          }}
        >
          ToDo
        </div>
        {sessionStorage.getItem("token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <span>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Register</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
