// this is a component that will be used to create a new todo
import Header from "../../comp/header";
import "./editTodo.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EditTodo() {
  const navigate = useNavigate();

  const getTodo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getTodo/${sessionStorage.getItem(
          "todoId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setTitle(data.title);
      setDescription(data.description);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleEditTodo = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTodo/${sessionStorage.getItem(
          "todoId"
        )}`,
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
    <div className="edit-todo-comp">
      <Header />
      <div className="edit-todo-wrapper">
        <div className="edit-todo-container">
          <div className="edit-todo-title">Edit Todo</div>
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
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button onClick={handleEditTodo}>Edit Todo</button>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
