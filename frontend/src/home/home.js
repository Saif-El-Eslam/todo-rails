import Header from "../comp/header";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // navigate to the login page
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="home">
      <Header />
      <div className="home-container">
        <h1>ToDo</h1>
        <div className="home-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
