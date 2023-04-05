import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FileContext } from "../../context/FileContext";
import Files from "../Files";
import FileUpload from "../FileUpload";
import { SuccessAlert, DangerAlert } from "../../util/Alert";
import Cropper from "react-easy-crop";
import ReactCrop from "react-image-crop";

function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

  return (
    <div>
      <div>
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              position: "relative",
              width: "300px",
              height: "300px",
              backgroundColor: "#fff",
            },
          }}
        />
      </div>

      <div className="action-btns">
        <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <input type="radio" value={1 / 1} name="ratio" /> 1:1
          <input type="radio" value={5 / 4} name="ratio" /> 5:4
          <input type="radio" value={4 / 3} name="ratio" /> 4:3
          <input type="radio" value={3 / 2} name="ratio" /> 3:2
          <input type="radio" value={5 / 3} name="ratio" /> 5:3
          <input type="radio" value={16 / 9} name="ratio" /> 16:9
          <input type="radio" value={3 / 1} name="ratio" /> 3:1
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onCropCancel}
        >
          Cancel
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

function EditProfile() {
  const [uploadModalShow, setUploadShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [image, setImage] = useState("");
  const { name, bio, email, profile, editProfile } = useContext(UserContext);
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

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = profile;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/png");

      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Edit profile</h2>
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          name="name"
          type="text"
          className="border border-gray-400 py-2 px-3 w-full rounded-lg"
          defaultValue={name}
        />
        <label className="block text-gray-700 font-semibold mb-2">Bio:</label>
        <input
          name="bio"
          type="text"
          className="border border-gray-400 py-2 px-3 w-full rounded-lg"
          defaultValue={bio}
        />
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          name="email"
          type="email"
          className="border border-gray-400 py-2 px-3 w-full rounded-lg"
          defaultValue={email}
          disabled
        />
        <label className="text-gray-700 font-semibold mb-2">Profile:</label>
        {/* <img
          alt="profile"
          src={profile}
          style={{ width: "" }}
        /> */}
        <div className="container sm">
          <ImageCropper
            image={profile}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        </div>
        <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
          <Files name="files" />
          <p
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setUploadShowModal(true)}
          >
            Upload new one
          </p>
        </div>

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
    </>
  );
}

export default EditProfile;
