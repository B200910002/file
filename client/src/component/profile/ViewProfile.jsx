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
    <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
      <h2 className="text-gray-700 font-bold mb-2">Profile</h2>
      <div className="flex flex-col items-center justify-center h-60">
        <img
          alt="profile"
          src={profile}
          style={{ width: "100px", height: "100px", borderRadius: "100px" }}
        />
        <p>name: {name}</p>
        <p>bio: {bio}</p>
        <p>email: {email}</p>
        <p>role: {role}</p>

        <NavLink to="edit">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              // setEditModalShow(true);
            }}
          >
            Edit profile
          </button>
        </NavLink>

        <br />
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
    </div>
  );
}

export default ViewProfile;
