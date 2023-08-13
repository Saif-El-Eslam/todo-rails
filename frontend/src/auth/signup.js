import { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../comp/header";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function Signup() {
  const navigate = useNavigate();

  //   const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // handle errors
    if (username === "" || email === "" || password === "") {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          username,
          email,
          password,
        }
      );

      console.log(data);
      setError("");
      navigate("/login");
    } catch (err) {
      console.log(err);
      //   setError(err.response.data.message);
    }
  };

  return (
    <Box w="100%" h="100vh" align="center">
      <Header />

      <Box>
        <Card
          w="50%"
          h="550px"
          align="center"
          mt="5%"
          borderRadius="lg"
          backgroundColor="#eee"
        >
          <CardHeader>
            <Heading size={"lg"}>Signup</Heading>
          </CardHeader>

          <CardBody mt={"0px"} w="100%">
            <VStack gap={4}>
              <Box w="80%">
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  backgroundColor="#E8F0FE"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>

              <Box w="80%">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  backgroundColor="#E8F0FE"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box w="80%">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  backgroundColor="#E8F0FE"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box w="80%">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  backgroundColor="#E8F0FE"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>

              <Button colorScheme="blue" onClick={handleSubmit}>
                {" "}
                Signup{" "}
              </Button>

              <Box color="red">{error}</Box>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export default Signup;
