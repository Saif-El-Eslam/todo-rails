// this is a component that will be used to create a new todo
import Header from "../../comp/header";
import "./createTodo.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCreateTodo = async () => {
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
    todoData.append("image", image);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addTodo`,
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
            <Heading size={"lg"}>Create Todo</Heading>
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
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Box>

              <Button onClick={handleCreateTodo} colorScheme="blue">
                Create Todo
              </Button>

              <Box color="red">{error}</Box>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export default CreateTodo;
