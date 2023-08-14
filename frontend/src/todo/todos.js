import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Todo from "./todo";
import Header from "../comp/header";
import { Box } from "@chakra-ui/react";

function Todos() {
  const navigate = useNavigate();

  // get all todos
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

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
      // console.log(err);
      if (err.response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        navigate("/login");
      }
      if (err.response.status === 500) {
        setError("Something went wrong");
      }

      if (err.response.status === 404) {
        setError("No todos found");
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box align="center">
      <Header />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="50%"
        h="50px"
        border="2px solid #eee"
        borderRadius="lg"
        mt="30px"
        _hover={{
          cursor: "pointer",
          backgroundColor: "#eee",
        }}
        _active={{
          backgroundColor: "#ddd",
          transform: "scale(0.98)",
        }}
        onClick={() => {
          if (sessionStorage.getItem("token")) navigate("/todo/create");
          else navigate("/login");
        }}
      >
        {sessionStorage.token ? "Create Todo +" : "Login to create todo"}
      </Box>

      {error && <Box color="red">{error}</Box>}

      {/* rinder the todos */}
      {todos.map((todo) => (
        <Todo todo={todo} getTodos={getTodos} key={todo._id.$oid} />
      ))}
    </Box>
  );
}

export default Todos;
