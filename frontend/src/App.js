import "./App.css";
import Home from "./home/home";
import Todos from "./todo/todos";
import CreateTodo from "./todo/createTodo/createTodo";
import EditTodo from "./todo/editTodo/editTodo";
import Signup from "./auth/signup";
import Login from "./auth/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todos />} />
          <Route path="/todo/create" element={<CreateTodo />} />
          <Route path="/todo/edit/:id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
