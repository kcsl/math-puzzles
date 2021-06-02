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
import React, { useState } from "react";

import { REGISTER_ADMIN } from "../../util/graphql";

function Invite(props) {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(REGISTER_ADMIN, {
    update(_, { data: { userRegister: userData } }) {
      window.location = "/admin/administrator";
      console.log(userData)
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },
    variables: {
      username,
      password,
      email,
      confirmPassword,
      firstName,
      lastName
    },
  });

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Invite new Administrator</Heading>

        <Input
          placeholder="First Name"
          variant="filled"
          mb={3}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <Input
          placeholder="Last Name"
          variant="filled"
          mb={3}
          onChange={(event) => setlastName(event.target.value)}
        />

        <FormControl isInvalid={errors.username}>
          <Input
            placeholder="Username"
            variant="filled"
            mb={3}
            onChange={(event) => setUsername(event.target.value)}
          />
          <FormErrorMessage>{errors?.username}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <Input
            placeholder="Email"
            variant="filled"
            mb={3}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormErrorMessage>{errors?.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <Input
            placeholder="********"
            variant="filled"
            mb={6}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormErrorMessage>{errors?.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword}>
          <Input
            placeholder="********"
            variant="filled"
            mb={6}
            type="password"
            onChange={(event) => setconfirmPassword(event.target.value)}
          />
          <FormErrorMessage>{errors?.confirmPassword}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="teal" onClick={loginUser}>
          Register
        </Button>
      </Flex>
    </Flex>
  );
}

export default Invite;
