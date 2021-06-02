import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("admin_jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("admin_jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("admin_jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AdminAuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

function AdminAuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("admin_jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("admin_jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AdminAuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AdminAuthContext, AdminAuthProvider };
