import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ChangePassword from "./ChangePassword";
import FileUpload from "../FileUpload";
import { NavLink } from "react-router-dom";

function ViewProfile() {
  const [editModalShow, setEditModalShow] = useState(false);
  const [changePassModalShow, setChangePassModalShow] = useState(false);
  const { name, bio, email, profile, role } = useContext(UserContext);
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">View profile</h2>
      <div>
        <img alt="profile" src={profile} style={{height: "100px"}}/>
        <p className="text-gray-700 font-semibold">Name: {name}</p>
        <p className="text-gray-700 font-semibold">Bio: {bio}</p>
        <p className="text-gray-700 font-semibold">Email: {email}</p>
        <p className="text-gray-700 font-semibold">Role: {role}</p>
        <NavLink to="edit">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Edit profile
          </button>
        </NavLink>{" "}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => {
            setChangePassModalShow(true);
          }}
        >
          Change Password
        </button>
        {changePassModalShow && (
          <ChangePassword setOpenModal={setChangePassModalShow} />
        )}
        {editModalShow && <FileUpload setOpenModal={setEditModalShow} />}
      </div>
    </>
  );
}

export default ViewProfile;
