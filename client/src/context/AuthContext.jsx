import React, { Component, createContext } from "react";
import axios from "axios";
import {
  LOGIN_URL,
  REGISTER_URL,
  IS_AUTHENCATED_URL,
  CONFiG,
} from "../config/URL";

export const AuthContext = createContext({});

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, user: {} };
  }

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
    await this.isAuthenticated();
  };

  isAuthenticated = async () => {
    try {
      await axios.get(IS_AUTHENCATED_URL, CONFiG).then((response) => {
        this.setState({ isAuthenticated: response.data.isAuthenticated });
      });
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  login = async (email, password) => {
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

  logout = async () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  register = async (email, password, repeatPassword) => {
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

  render() {
    const { isAuthenticated, user } = this.state;
    const { login, logout, register } = this;
    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
