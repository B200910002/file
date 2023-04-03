import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FileContext } from "../../context/FileContext";
import Files from "../Files";
import FileUpload from "../FileUpload";
import { SuccessAlert, DangerAlert } from "../../util/Alert";

function EditProfile() {
  const [uploadModalShow, setUploadShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const { editProfile } = useContext(UserContext);
  const { selectedItemId } = useContext(FileContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      bio: event.target.bio.value,
      profile_id: event.target.file_id.value,
    };
    const response = await editProfile(user);
    setResponse(response);
  };

  return (
    <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Edit profile</h2>
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          name="name"
          type="text"
          className="border border-gray-400 py-2 px-3 w-full rounded-lg"
        />
        <label className="block text-gray-700 font-semibold mb-2">Bio:</label>
        <input
          name="bio"
          type="text"
          className="border border-gray-400 py-2 px-3 w-full rounded-lg"
        />
        <label className="text-gray-700 font-semibold mb-2">
          Choose profile:
        </label>
        <p
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setUploadShowModal(true)}
        >
          Upload new one
        </p>
        <Files name="files" />
        <input type="hidden" name="file_id" value={selectedItemId} />
        <button
          name="submit"
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
      {uploadModalShow && <FileUpload setOpenModal={setUploadShowModal} />}
      <div>
        <br />
        {response ? (
          response.error ? (
            <DangerAlert message={response.error} />
          ) : (
            <SuccessAlert message={response} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
