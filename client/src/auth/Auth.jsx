import React, { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const { isAuthenticated } = useContext(AuthContext);
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
        <Navigate to="/" />
      )}
    </>
  );
}
