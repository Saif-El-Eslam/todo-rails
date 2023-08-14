import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";

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
  const markAsDone = async (done) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTodo/${todo._id.$oid}`,
        {
          completed: done,
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
    <Card w="50%" p="5px" display="flex" flexDirection="row" m="20px">
      <CardHeader w="60%" display="flex" flexDirection="column" gap={6}>
        <Heading>{todo.title}</Heading>
        <Box>{todo.description}</Box>
      </CardHeader>

      <CardBody w="30%" p="10px" display="flex" flexDirection="column" gap={6}>
        <Box>
          {todo.image.url && (
            <Image
              w="100px"
              h="100px"
              borderRadius="50%"
              src={`http://localhost:3000/${todo.image.url}`}
              alt="todo avatar"
            />
          )}
        </Box>
        <Box>
          {todo.completed ? (
            <Button colorScheme="green" onClick={() => markAsDone(0)}>
              DONE
            </Button>
          ) : (
            <Button colorScheme="gray" onClick={() => markAsDone(1)}>
              Mark as done
            </Button>
          )}
        </Box>
      </CardBody>

      <CardFooter
        w="10%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        p="5px"
      >
        <Box>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteTodo(todo._id.$oid)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            onClick={() => {
              sessionStorage.setItem("todoId", todo._id.$oid);
              navigate("/todo/edit/" + todo._id.$oid);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
}

export default Todo;
