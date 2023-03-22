import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default class Auth extends Component {
  static contextType = AuthContext;
  render() {
    const { isAuthenticated } = this.context;
    return (
      <>
        {!isAuthenticated ? (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                <Link to="login">Login</Link>
                {" / "}
                <Link to="register">Register</Link>
              </h2>
              <Outlet />
            </div>
          </div>
        ) : (
          <>{(window.location.href = "/")}</>
        )}
      </>
    );
  }
}
