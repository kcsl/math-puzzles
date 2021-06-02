import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import {BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import AdminApp from "./Admin/AdminApp";
import UserApp from "./User/UserApp";
import theme from "./util/theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Route exact path="/" >
          <Redirect to="/user"></Redirect>
        </Route>
        <Route  path="/user" component={UserApp} />
        <Route  path="/admin" component={AdminApp} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
