import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("user_jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("user_jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("user_jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const UserAuthContext = createContext({
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

function UserAuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("user_jwtToken", userData.token);
    console.log(userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("user_jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <UserAuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export {UserAuthContext, UserAuthProvider}
