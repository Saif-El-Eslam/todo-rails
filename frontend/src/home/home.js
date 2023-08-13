import { useEffect } from "react";
import Header from "../comp/header";
import "./home.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // navigate to the login page
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    sessionStorage.token ? navigate("/todo") : navigate("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box w="100%" h="100vh" align="center">
      <Header />

      {/* center the card vertically */}
      <Box>
        <Card
          w="50%"
          h="400px"
          align="center"
          mt="10%"
          borderRadius="lg"
          backgroundColor="#eee"
        >
          <CardHeader>
            <Heading size={"lg"}>TODO</Heading>
          </CardHeader>

          <CardBody mt={"100px"} w="100%">
            {/* <ButtonGroup display="flex" flexDirection="column" gap={8}> */}

            <VStack gap={8}>
              <Button
                w="50%"
                colorScheme="blue"
                onClick={handleLogin}
                variant="outline"
                m="auto"
              >
                Login
              </Button>
              <Button
                w="50%"
                colorScheme="blue"
                onClick={handleSignup}
                variant="outline"
                m="auto"
              >
                Signup
              </Button>
            </VStack>

            {/* </ButtonGroup> */}
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export default Home;
