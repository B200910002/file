import React from "react";
import { Outlet } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import { FileProvider } from "../context/FileContext";

function Profile() {
  return (
    <UserProvider>
      <FileProvider>
        <ProfileConsumer />
      </FileProvider>
    </UserProvider>
  );
}

function ProfileConsumer() {
  return (
    <UserContext.Consumer>
      {(context) => (
        <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
          <Outlet />
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Profile;
