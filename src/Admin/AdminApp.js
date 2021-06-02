import React from "react";
import { AdminAuthProvider } from "../context/AdminAuth";
import {
  AdminAuthenticatedRoute,
  AdminProtectedRoute,
} from "../util/authRoutes";

import NavBar from "./Components/NavBar";
import Add from "./Pages/Add";
import Admin from "./Pages/Admin";
import Edit from "./Pages/Edit";
import Home from "./Pages/Home";
import Invite from "./Pages/Invite";
import Login from "./Pages/Login";

function AdminApp() {
  return (
    <AdminAuthProvider>
      <NavBar />
      <AdminAuthenticatedRoute component={Login} exact path="/admin/login" />
      <AdminProtectedRoute
        component={Home}
        exact
        path="/admin"
        redirect="/admin/login"
      />
      <AdminProtectedRoute
        component={Add}
        exact
        path="/admin/add"
        redirect="/admin/login"
      />
      <AdminProtectedRoute
        component={Edit}
        exact
        path="/admin/edit/:problemID"
        redirect="/admin/login"
      />
      <AdminProtectedRoute
        component={Admin}
        exact
        path="/admin/administrator"
        redirect="/admin/login"
      />
      <AdminProtectedRoute
        component={Invite}
        exact
        path="/admin/administrator/add"
        redirect="/admin/login"
      />
    </AdminAuthProvider>
  );
}

export default AdminApp;
