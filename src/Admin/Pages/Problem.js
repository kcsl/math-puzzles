import { useQuery } from "@apollo/client";
import {
  Container,
  CircularProgress,
  VStack,
  Heading,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { Markup } from "interweave";
import React from "react";
import { FETCH_PROBLEM } from "../../util/graphql";
import { transform } from "../../util/Interweave";

function Part({ part }) {
  let question = "";
  let answer = "";
  let explanation = part.explanation
  let body = "";

  if (part.question) {
    question = part.question;
    answer = part.answer;
  } else body = part.body;

  const background = useColorModeValue("gray.100", "gray.700");

  return question ? (
    <VStack
      justifyContent="center"
      rounded={6}
      p={12}
      background={background}
      spacing={6}
    >
      <Markup content={question} transform={transform} />
      <Input defaultValue={answer} variant="filled" isDisabled />
      {explanation && <Markup content={explanation} transform={transform} />}
    </VStack>
  ) : (
    <VStack
      justifyContent="center"
      rounded={6}
      p={12}
      background={background}
      spacing={6}
    >
      <Markup content={body} transform={transform} />
    </VStack>
  );
}

function Problem({ match }) {
  const { problemID } = match.params;

  const { data, loading } = useQuery(FETCH_PROBLEM, {
    variables: { problemID },
  });

  let problem = {};

  if (!loading) {
    problem = data?.getProblem;
    console.log(problem);
  }

  return loading ? (
    <Container centerContent maxW="container.xl" alignItems="center">
      <CircularProgress isIndeterminate color="teal" />
    </Container>
  ) : (
    <Container centerContent maxW="container.xl" alignItems="center">
      <VStack spacing={6} align="center">
        <Heading size="2xl">{problem.title}</Heading>
        <Heading size="lg">{problem.topic}</Heading>
        {problem.parts.map((part, index) => (
          <Part part={problem.parts[index]} key={index} />
        ))}
      </VStack>
    </Container>
  );
}

export default Problem;
