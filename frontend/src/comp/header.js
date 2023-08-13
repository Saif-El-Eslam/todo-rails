// this is a header component that has a logo and a logout button

import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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
      sessionStorage.removeItem("username");
      navigate("/");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // get api call to /say_hello with username in the body
  const [greeting, setGreeting] = useState("");
  const getGreeting = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/say_hello`,
        {
          username: sessionStorage.getItem("username"),
        }
      );
      setGreeting(data.message);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // call getGreeting() when the component mounts
  useEffect(() => {
    getGreeting();
  }, []);

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

        <div className="username" onClick={() => navigate("/todo")}>
          {sessionStorage.username && greeting}
        </div>

        {sessionStorage.token ? (
          <button onClick={() => handleLogout()}>Logout</button>
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
