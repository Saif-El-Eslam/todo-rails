import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo({ todo, getTodos }) {
  const navigate = useNavigate();
  // delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/deleteTodo/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // mark todo as done
  const markAsDone = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTodo/${todo._id.$oid}`,
        {
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="todo">
      {/* this is a card consist of a Header and a done checkbox with an optional description and image */}
      <div className="todo-card">
        <div className="todo-content">
          <div className="todo-left">
            <div className="todo-title">
              <h1>{todo.title}</h1>
            </div>
            <div className="todo-description">
              <p>{todo.description}</p>
            </div>
          </div>
          <div className="todo-right">
            <div className="todo-image">
              <img src={todo.image} alt="todo description" />
            </div>
            <div className="todo-done">
              {todo.completed ? (
                <div className="done">DONE</div>
              ) : (
                <div className="mark-done" onClick={markAsDone}>
                  Mark as done
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="todo-actions">
          <div
            className="todo-delete"
            onClick={() => handleDeleteTodo(todo._id.$oid)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div
            className="todo-edit"
            onClick={() => {
              sessionStorage.setItem("todoId", todo._id.$oid);
              navigate("/todo/edit/" + todo._id.$oid);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
