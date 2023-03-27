import React, { useContext, useState } from "react";
// import { Link, Outlet, useParams } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import { FileProvider } from "../context/FileContext";
import ChangePassword from "../component/ChangePassword";
import FileUpload from "../component/FileUpload";
// import NoPage from "../page/NoPage";

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
  const [editModalShow, setEditModalShow] = useState(false);
  const [changePassModalShow, setChangePassModalShow] = useState(false);
  const { name, email } = useContext(UserContext);

  return (
    <UserContext.Consumer>
      {(context) => (
        <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
          <h2 className="text-gray-700 font-bold mb-2">Profile</h2>
          <div className="flex flex-col items-center justify-center h-60">
            <p>name: {name}</p>
            <p>email: {email}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                setEditModalShow(true);
              }}
            >
              Edit profile
            </button>
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
      )}
    </UserContext.Consumer>
  );
}

export default Profile;
