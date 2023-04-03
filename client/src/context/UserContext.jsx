import React, { createContext, useState, useEffect } from "react";
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
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        await axios.get(USER_URL, CONFiG).then((response) => {
          setName(response.data.user.name);
          setBio(response.data.user.bio);
          setEmail(response.data.user.email);
          setProfile(response.data.user.profile);
          setRole(response.data.user.role);
        });
      } catch (e) {
        console.log(e.response.data.error);
      }
    }

    getUser();
  }, []);

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

  const editProfile = async (user) => {
    try {
      const response = await axios.put(
        EDIT_USER_URL,
        {
          name: user.name,
          bio: user.bio,
          profile_id: user.profile_id,
        },
        CONFiG
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        bio,
        email,
        profile,
        role,
        changePassword,
        editProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
