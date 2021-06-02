import { useMutation } from "@apollo/client";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { AdminAuthContext } from "../../context/AdminAuth";
import { LOGIN_ADMIN } from "../../util/graphql";

function Login(props) {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const context = useContext(AdminAuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [loginUser] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { adminLogin: userData } }) {
      context.login(userData);
      window.location = "/admin";
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions.exception.errors);
      console.log(errors);
    },
    variables: {
      username,
      password,
    },
  });

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <FormControl isInvalid={errors?.general} mb={6}>
          <FormControl isInvalid={errors?.general || errors?.username}>
            <Input
              placeholder="Username"
              variant="filled"
              mb={3}
              onChange={(event) => setUsername(event.target.value)}
            />
            <FormErrorMessage>{errors?.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.general || errors?.password}>
            <Input
              placeholder="********"
              variant="filled"
              mb={6}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormErrorMessage>{errors?.password}</FormErrorMessage>
          </FormControl>
          <FormErrorMessage>{errors?.general}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" onClick={loginUser}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
