import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../context/UserAuth";
import { AdminAuthContext } from "../context/AdminAuth";

function UserProtectedRoute({ redirect, component: Component, ...rest }) {
  const { user } = useContext(UserAuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
}

function UserAuthenticatedRoute({ redirect = "/user", component: Component, ...rest }) {
  const { user } = useContext(UserAuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={redirect} /> : <Component {...props} />
      }
    />
  );
}

function AdminProtectedRoute({ redirect, component: Component, ...rest }) {
  const { user } = useContext(AdminAuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
}

function AdminAuthenticatedRoute({ redirect="/admin", component: Component, ...rest }) {
  const { user } = useContext(AdminAuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={redirect} /> : <Component {...props} />
      }
    />
  );
}

export {
  UserProtectedRoute,
  UserAuthenticatedRoute,
  AdminProtectedRoute,
  AdminAuthenticatedRoute,
};
