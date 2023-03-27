import React, { useContext, useState } from "react";
// import { Link, Outlet, useParams } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import ChangePassword from "../component/ChangePassword";
// import NoPage from "../page/NoPage";

function Profile() {
  return (
    <UserProvider>
      <ProfileConsumer />
    </UserProvider>
  );
}

function ProfileConsumer() {
  // const [editModalShow, setEditModalShow] = useState(false);
  const [changePassModalShow, setChangePassModalShow] = useState(false);
  const { name, email } = useContext(UserContext);

  return (
    <UserContext.Consumer>
      {(context) => (
        <div className="flex flex-col items-center justify-center h-60">
          <p>name: {name}</p>
          <p>email: {email}</p>
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
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Profile;
