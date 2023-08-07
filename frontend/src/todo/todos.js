import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Todo from "./todo";
import Header from "../comp/header";

function Todos() {
  const navigate = useNavigate();

  // get all todos
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getTodos`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todos">
      <Header />
      <div className="todos-container">
        <div
          className="create-todo"
          onClick={() => {
            if (sessionStorage.getItem("token")) navigate("/todo/create");
            else navigate("/login");
          }}
        >
          {sessionStorage.token ? "Create Todo +" : "Login to create todo"}
        </div>

        {/* rinder the todos */}
        {todos.map((todo) => (
          <Todo todo={todo} getTodos={getTodos} key={todo._id.$oid} />
        ))}
      </div>
    </div>
  );
}

export default Todos;
