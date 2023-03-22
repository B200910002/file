import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  LOGIN_URL,
  REGISTER_URL,
  IS_AUTHENCATED_URL,
  CONFiG,
} from "../config/URL";

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const isAuthenticate = async () => {
      try {
        await axios.get(IS_AUTHENCATED_URL, CONFiG).then((response) => {
          setIsAuthenticated(true);
        });
      } catch (e) {
        console.log(e.response.data.error);
      }
    };
    isAuthenticate();
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";
        return "Login successfully";
      } else {
        alert("Please check your email and password");
      }
    } catch (e) {
      return e.response.data;
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  const register = async (email, password, repeatPassword) => {
    try {
      const response = await axios.post(REGISTER_URL, {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}