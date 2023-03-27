import React, { Component, createContext } from "react";
import axios from "axios";
import {
  CHANGE_PASSWORD_URL,
  USER_URL,
  EDIT_USER_URL,
  CONFiG,
} from "../config/URL";

export const UserContext = createContext({});

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "" };
  }

  changePassword = async (oldPassword, newPassword, repeatNewPassword) => {
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

  getUser = async (email) => {
    try {
      const response = await axios.get(USER_URL + `/${email}`, CONFiG);
      this.setState({
        status: response.data.status,
        isFollowing: response.data.isFollowing,
        name: response.data.user.name,
        photo: response.data.user.photo,
        bio: response.data.user.bio,
        email: response.data.user.email,
        followers: response.data.user.followers,
        following: response.data.user.following,
      });
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  editProfile = async (user) => {
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

  render() {
    const { name, email } = this.state;
    const { changePassword, getUser, editProfile } = this;
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
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
