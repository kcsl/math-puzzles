import { useQuery } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  CircularProgress,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

import { FETCH_COMPLETED_PROBLEM } from "../../util/graphql";
import Part from "../Components/Part";

function SinglePart({ match }) {
  let { problemID, index } = match.params;
  index = parseInt(index);

  const { data, loading } = useQuery(FETCH_COMPLETED_PROBLEM, {
    variables: {
      problemID,
    },
  });

  let problem = {}

  if (!loading) {
    problem = data.getCompletedProblem
  }

  return (
    <Container centerContent maxW="container.xl" alignItems="center">
      {loading ? (
        <CircularProgress isIndeterminate color="teal" />
      ) : (
        <VStack spacing={6} align="center">
          <Heading size="2xl">{problem.title}</Heading>
          <Heading size="lg">{problem.topic}</Heading>
          <Part problemID={problemID} part={problem.parts[index]}/>
          <HStack spacing={3} align="center">
            {index !== 0 && (
              <Button
                as={Link}
                to={`/user/problem/${problemID}/${index - 1}`}
                leftIcon={<ChevronLeftIcon />}
              >
                Back
              </Button>
            )}
            {index !== problem.sections - 1 && (
              <Button
                as={Link}
                to={`/user/problem/${problemID}/${index + 1}`}
                rightIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            )}
            <Button
              as={Link}
              to={`/user`}
              rightIcon={<Icon as={BsFillHouseFill} />}
            >
              Home
            </Button>
          </HStack>
        </VStack>
      )}
    </Container>
  );
}

export default SinglePart;
