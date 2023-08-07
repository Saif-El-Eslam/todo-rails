// this is a component that will be used to create a new todo
import Header from "../../comp/header";
import "./createTodo.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleCreateTodo = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addTodo`,
        {
          title,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
          },
        }
      );
      console.log(data);
      navigate("/todo");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-todo-comp">
      <Header />
      <div className="create-todo-wrapper">
        <div className="create-todo-container">
          <div className="create-todo-title">Create Todo</div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            placeholder="Image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={handleCreateTodo}>Create Todo</button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
