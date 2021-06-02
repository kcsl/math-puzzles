import { useMutation } from "@apollo/client";
import { Input } from "@chakra-ui/input";
import { Container, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { ADD_PROBLEM } from "../../util/graphql";
import "react-quill/dist/quill.snow.css";
import { Button } from "@chakra-ui/button";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

function Add() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [parts, setParts] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [addProblem] = useMutation(ADD_PROBLEM, {
    update(proxy, result) {
      console.log(result);
      window.location = "/admin";
    },
    variables: {
      newProblemInput: {
        title,
        topic,
        parts,
      },
    },
  });

  function onChangeQuestion(value, index) {
    let copy = [...parts];
    copy[index].question = value;
    setParts(copy);
  }

  function onChangeAnswer(value, index) {
    let copy = [...parts];
    copy[index].answer = value;
    setParts(copy);
  }

  function addPart() {
    setParts([
      ...parts,
      {
        question: "",
        answer: "",
      },
    ]);
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={8}>
      <Heading>Add New Problem</Heading>
      <Container centerContent>
        <Text mb={2}>Title</Text>
        <Input
          variant="filled"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </Container>
      <Container centerContent>
        <Text mb={2}>Topic</Text>
        <Input
          variant="filled"
          placeholder="Topic"
          onChange={(event) => setTopic(event.target.value)}
        />
      </Container>
      {parts.map((part, index) => (
        <Container maxW="container.xl" key={index} mb={8}>
          <Heading size="lg" mb={6}>{`Part ${index + 1}`}</Heading>
          <Text mb={2}>Question</Text>
          <ReactQuill
            theme="snow"
            value={parts[index].question}
            onChange={(value) => onChangeQuestion(value, index)}
          />
          <Text mb={2} mt={6}>
            Answer
          </Text>
          <Input
            variant="filled"
            placeholder="Answer"
            onChange={(event) => onChangeAnswer(event.target.value, index)}
          />
        </Container>
      ))}
      <HStack spacing={3} align="center">
        <Button leftIcon={<AddIcon />} onClick={addPart}>
          Add
        </Button>
        <Button rightIcon={<CheckIcon />} onClick={addProblem}>
          Submit
        </Button>
      </HStack>
    </Stack>
  );
}

export default Add;
