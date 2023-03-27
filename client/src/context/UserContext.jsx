import React, { Component, createContext, useState } from "react";
import axios from "axios";
import {
  CHANGE_PASSWORD_URL,
  USER_URL,
  EDIT_USER_URL,
  CONFiG,
} from "../config/URL";

export const UserContext = createContext({});

export function UserProvider(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const changePassword = async (
    oldPassword,
    newPassword,
    repeatNewPassword
  ) => {
    try {
      const response = await axios.patch(
        CHANGE_PASSWORD_URL,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          repeatNewPassword: repeatNewPassword,
        },
        CONFiG
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
      return e.response.data;
    }
  };

  const getUser = async (email) => {
    try {
      await axios.get(USER_URL + `/${email}`, CONFiG).then((response) => {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
      });
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const editProfile = async (user) => {
    console.log("pezda");
    try {
      await axios.put(
        EDIT_USER_URL,
        {
          name: user.name,
          photo: user.photo,
          bio: user.bio,
        },
        CONFiG
      );
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        getUser,
        changePassword,
        editProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
