import React from 'react'

import {UserAuthProvider} from "../context/UserAuth"
import NavBar from "./Components/NavBar"
import {UserAuthenticatedRoute} from "../util/authRoutes"

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import SinglePart from "./Pages/SingleProblem"

import { Route, useRouteMatch } from 'react-router'

function UserApp() {

  const { path, url } = useRouteMatch();

    return (
      <UserAuthProvider>
        <NavBar />
        <Route exact path={`${path}`} component={Home} />
        <Route path={`${path}/problem/:problemID/:index`} component={SinglePart} />
        <UserAuthenticatedRoute path={`${path}/login`} component={Login} />
        <UserAuthenticatedRoute path={`${path}/register`} component={Register} />
      </UserAuthProvider>
    );
}

export default UserApp
