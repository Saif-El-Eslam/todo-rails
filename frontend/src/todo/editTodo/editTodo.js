// this is a component that will be used to create a new todo
import Header from "../../comp/header";
import "./editTodo.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function EditTodo() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleEditTodo = async () => {
    // handle errors
    if (title === "") {
      setError("Title is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const todoData = new FormData();

    todoData.append("title", title);
    todoData.append("description", description);
    if (image) todoData.append("image", image);

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTodo/${sessionStorage.getItem(
          "todoId"
        )}`,
        todoData,
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
    <Box w="100%" h="100vh" align="center">
      <Header />

      <Box>
        <Card
          w="50%"
          h="450px"
          align="center"
          mt="5%"
          borderRadius="lg"
          backgroundColor="#eee"
        >
          <CardHeader>
            <Heading size={"lg"}>Edit Todo</Heading>
          </CardHeader>

          <CardBody mt={"0px"} w="100%">
            <VStack spacing={4}>
              <Box w="80%">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  backgroundColor="#E8F0FE"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              <Box w="80%">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Description"
                  backgroundColor="#E8F0FE"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>

              <Box w="80%">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  placeholder="Image"
                  backgroundColor="#E8F0FE"
                  accept="image/*"
                  // value={image}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Box>

              <Button onClick={handleEditTodo} colorScheme="blue">
                Edit Todo
              </Button>

              <Box color="red">{error}</Box>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export default EditTodo;
