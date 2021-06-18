import { gql } from "@apollo/client";

// ! User queries and mutations

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      id
      token
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    userRegister(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      username
    }
  }
`;

export const FETCH_COMPLETED_PROBLEMS = gql`
  {
    getUser {
      problemsCompleted {
        id
        title
        topic
        sections
        createdAt
        parts {
          id
          completed
        }
      }
    }
  }
`;

export const FETCH_COMPLETED_PROBLEM = gql`
  query ($problemID: ID!) {
    getCompletedProblem(ProblemID: $problemID) {
      title
      topic
      sections
      createdAt
      parts {
        id
        completed
        ... on Question {
          question
          answer
        }
        ... on Slide {
          body
        }
      }
    }
  }
`;

export const SUBMIT_ANSWER = gql`
  mutation ($partID: ID!) {
    solvePart(partID: $partID)
  }
`;

// ! Admin queries and mutations

export const LOGIN_ADMIN = gql`
  mutation login($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password) {
      id
      token
      username
    }
  }
`;

export const GET_PROBLEMS = gql`
  {
    getProblems {
      title
      topic
      sections
      id
      createdAt
      author
    }
  }
`;

export const DELETE_PROBLEM = gql`
  mutation delete($problemID: ID!) {
    deleteProblem(problemID: $problemID)
  }
`;

export const ADD_PROBLEM = gql`
  mutation MyMutation(
    $parts: [PartInput] = {}
    $title: String!
    $topic: String!
  ) {
    createProblem(
      newProblemInput: { parts: $parts, title: $title, topic: $topic }
    ) {
      title
      topic
      sections
      id
      createdAt
      author
    }
  }
`;

export const FETCH_ADMINS = gql`
  {
    getAdmins {
      first_name
      last_name
      email
      role
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    adminRegister(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        first_name: $firstName
        last_name: $lastName
        role: "admin"
      }
    ) {
      id
      token
      username
    }
  }
`;

export const FETCH_PROBLEM = gql`
  query getProblem($problemID: ID!) {
    getProblem(problemID: $problemID) {
      id
      title
      topic
      parts {
        ... on Question {
          question
          answer
        }
        ... on Slide {
          body
        }
        index
      }
    }
  }
`;

export const UPDATE_PROBLEM = gql`
  mutation update(
    $title: String!
    $topic: String!
    $parts: [PartInput]!
    $problemID: ID!
  ) {
    updateProblem(
      problemID: $problemID
      problem: { title: $title, topic: $topic, parts: $parts }
    ) {
      title
      topic
      sections
      id
      createdAt
      author
    }
  }
`;
