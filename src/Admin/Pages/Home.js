import { useMutation, useQuery } from "@apollo/client";
import {
  Icon,
  IconButton,
  Link,
  Td,
  Tr,
  Container,
  CircularProgress,
  Heading,
  Table,
  Thead,
  Th,
  Tbody,
} from "@chakra-ui/react";
import moment from "moment";
import { BsTrashFill } from "react-icons/bs";
import React from "react";
import { DELETE_PROBLEM, GET_PROBLEMS } from "../../util/graphql";
import { EditIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

//TODO finalize  update
function Problem({ problem }) {
  const [deleteProblem] = useMutation(DELETE_PROBLEM, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_PROBLEMS,
      });
      let write = {...data}
      write.getProblems = data.getProblems.filter((p) => p.id !== problem.id);

      proxy.writeQuery({query: GET_PROBLEMS, data: write})
    },
    variables: {
      problemID: problem.id
    }
  });

  return (
    <Tr>
      <Td>
        <Link as={ReactRouterLink} to={`/admin/problem/${problem.id}`}>{problem.title}</Link>
      </Td>
      <Td>{problem.topic}</Td>
      <Td>{problem.author}</Td>
      <Td>{problem.sections}</Td>
      <Td>{moment(problem.createdAt).format("MMM Do YYYY")}</Td>
      <Td>
        <IconButton aria-label="delete" icon={<Icon as={BsTrashFill} />} onClick={deleteProblem}/>
        <IconButton aria-label="update" icon={<EditIcon />} />
      </Td>
    </Tr>
  );
}

function Home() {
  const { loading, data } = useQuery(GET_PROBLEMS);

  let problems = [];

  if (!loading) {
    problems = data.getProblems;
    console.log(problems);
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
            <Th>Author</Th>
            <Th>Sections</Th>
            <Th>Created At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
            {problems.map(problem => <Problem key={problem.id} problem={problem}/>)}
        </Tbody>
      </Table>
    </Container>
  );
}

export default Home;
