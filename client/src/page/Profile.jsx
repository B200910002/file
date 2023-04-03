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
  return <UserContext.Consumer>{(context) => <Outlet />}</UserContext.Consumer>;
}

export default Profile;
