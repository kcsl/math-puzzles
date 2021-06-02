import { useQuery } from "@apollo/client";
import {
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
import React from "react";
import { FETCH_ADMINS } from "../../util/graphql";


function Admin() {
  const { loading, data } = useQuery(FETCH_ADMINS);

  let admins = [];

  if (!loading) {
    admins = data.getAdmins;
    console.log(admins);
  }

  return loading ? (
    <Container centerContent maxW="container.xl">
      <CircularProgress isIndeterminate color="teal" />
    </Container>
  ) : (
    <Container centerContent maxW="container.xl">
      <Heading as="h1" mb={6}>
        Administrators
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
              admins.map((admin, index) => (
                  <Tr key={index}>
                      <Td>{`${admin.first_name + " " + admin.last_name}`}</Td>
                      <Td><Link href={`mailto: ${admin.email}`}>{admin.email}</Link></Td>
                      <Td>{admin.role}</Td>
                  </Tr>
              ))
          }
        </Tbody>
      </Table>
    </Container>
  );
}

export default Admin;
