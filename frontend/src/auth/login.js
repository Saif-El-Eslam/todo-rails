import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../comp/header";
import {
  Box,
  Card,
  Heading,
  CardHeader,
  FormLabel,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // handle errors
    if (username === "" || password === "") {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    console.log(username, password);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );
      console.log(data.user);
      sessionStorage.setItem("token", data.user.token);
      sessionStorage.setItem("username", data.user.username);
      setError("");
      navigate("/todo");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <Box w="100%" h="100vh" align="center">
      <Header />

      <Box>
        <Card
          w="50%"
          h="400px"
          align="center"
          mt="10%"
          borderRadius="lg"
          backgroundColor="#eee"
        >
          <CardHeader mt="20px">
            <Heading size={"lg"}>LOGIN</Heading>
          </CardHeader>

          <VStack w="80%" mt="20px" spacing={5}>
            <Box w="100%">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>

            <Box w="100%">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Button
              colorScheme="blue"
              onClick={() => {
                handleSubmit();
              }}
            >
              {" "}
              Login{" "}
            </Button>

            <Box color="red">{error}</Box>
          </VStack>
        </Card>
      </Box>
    </Box>
  );
}

export default Login;
