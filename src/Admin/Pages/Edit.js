import { useMutation, useQuery } from "@apollo/client";
import { Input } from "@chakra-ui/input";
import {
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@chakra-ui/button";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { FETCH_PROBLEM, UPDATE_PROBLEM } from "../../util/graphql";

function Edit({ match }) {
  const { problemID } = match.params;
  let title = "";
  let topic = "";
  let parts = [];

  const { loading, data } = useQuery(FETCH_PROBLEM, {
    variables: { problemID },
  });

  const [updateProblem] = useMutation(UPDATE_PROBLEM, {
    update(proxy, result) {
      console.log(result);
      //   window.location = "/admin";
    },
    variables: {
      title,
      topic,
      parts,
      problemID,
    },
  });

  if (!loading) {
    title = data.getProblem.title;
    topic = data.getProblem.topic;
    parts = JSON.parse(JSON.stringify(data.getProblem.parts));
  }

  function onChangeQuestion(value, index) {
    parts[index].questions = value;
    console.log(title);
  }

  function onChangeAnswer(value, index) {
    parts[index].answer = value;
  }

  function addPart() {
    parts = [
      ...parts,
      {
        question: "",
        answer: "",
      },
    ];
  }

  function onSubmit() {
    console.log({
      title,
      topic,
      parts,
    });
    updateProblem();
  }

  return loading ? (
    <Container centerContent maxW="container.xl">
      <CircularProgress isIndeterminate color="teal" />
    </Container>
  ) : (
    <Stack alignItems="center" justifyContent="center" spacing={8}>
      <Heading>Update Problem</Heading>
      <Container centerContent>
        <Text mb={2}>Title</Text>
        <Input
          variant="filled"
          placeholder="Title"
          defaultValue={title}
          onChange={(event) => (title = event.target.value)}
        />
      </Container>
      <Container centerContent>
        <Text mb={2}>Topic</Text>
        <Input
          variant="filled"
          placeholder="Topic"
          defaultValue={topic}
          onChange={(event) => (topic = event.target.value)}
        />
      </Container>
      {parts.map((part, index) => (
        <Container maxW="container.xl" key={index} mb={8}>
          <Heading size="lg" mb={6}>{`Part ${index + 1}`}</Heading>
          <Text mb={2}>Question</Text>
          <ReactQuill
            theme="snow"
            defaultValue={parts[index].question}
            value={parts[index].question}
            onChange={(value) => onChangeQuestion(value, index)}
          />
          <Text mb={2} mt={6}>
            Answer
          </Text>
          <Input
            variant="filled"
            placeholder="Answer"
            defaultValue={parts[index].answer}
            onChange={(event) => onChangeAnswer(event.target.value, index)}
          />
        </Container>
      ))}
      <HStack spacing={3} align="center">
        <Button leftIcon={<AddIcon />} onClick={addPart}>
          Add
        </Button>
        <Button rightIcon={<CheckIcon />} onClick={onSubmit}>
          Submit
        </Button>
      </HStack>
    </Stack>
  );
}

export default Edit;
