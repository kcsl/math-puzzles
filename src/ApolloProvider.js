import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";
import { ColorModeScript } from "@chakra-ui/react";

// TODO uncomment line before publishing
const httpLink = createHttpLink({
  uri: "https://math-puzzles-server.herokuapp.com/",
});

// TODO comment line before publishing
// const httpLink = createHttpLink({
//   uri: "http://localhost:5000"
// })

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const authLink = setContext(() => {
  const user_token = localStorage.getItem("user_jwtToken");
  const admin_token = localStorage.getItem("admin_jwtToken");

  return {
    headers: {
      User_Authorization: user_token ? `Bearer ${user_token}` : `Bearer guest`,
      Admin_Authorization: admin_token ? `Bearer ${admin_token}` : "",
    }
  };
});



const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ColorModeScript/>
    <App />
  </ApolloProvider>
);
