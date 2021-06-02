import { useQuery } from "@apollo/client";
import {
  Heading,
  CircularProgress,
  Table,
  Thead,
  Tr,
  Container,
  Th,
  Tbody,
  Td,
  Link,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserAuthContext } from "../../context/UserAuth";
import moment from "moment";
import { FETCH_COMPLETED_PROBLEMS } from "../../util/graphql";
import ProgressBar from "../Components/ProgressBar";
import { Link as ReactRouterLink } from "react-router-dom";


function Home() {
  const { user } = useContext(UserAuthContext);

  const { loading, data } = useQuery(FETCH_COMPLETED_PROBLEMS);

  let problems = [];

  if (!loading) {
    problems = data.getUser.problemsCompleted;
  }

  return loading ? (
    <Container centerContent maxW="container.xl">
      <CircularProgress isIndeterminate color="teal" />
    </Container>
  ) : (
    <Container centerContent maxW="container.xl">
      <Heading as="h1" mb={6}>
        Home
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Topic</Th>
            {user ? <Th>Progress</Th> : <Th>Sections</Th>}
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {problems.map((problem) => (
            <Tr key={problem.id}>
              <Td>
                <Link
                  as={ReactRouterLink}
                  to={`/user/problem/${problem.id}/0`}
                >
                  {problem.title}
                </Link>
              </Td>
              <Td>{problem.topic}</Td>
              {user ? (
                <ProgressBar parts={problem.parts} problemID={problem.id} />
              ) : (
                <Td>{problem.sections}</Td>
              )}
              <Td>{moment(problem.createdAt).format("MMM Do YYYY")}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

export default Home;
