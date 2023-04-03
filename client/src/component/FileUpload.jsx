import React, { useContext, useState } from "react";
import { FileContext } from "../context/FileContext";
import { SuccessAlert, DangerAlert } from "../util/Alert";

export default function FileUpload({ setOpenModal }) {
  const [category, setCategory] = useState({});
  const [extention, setExtention] = useState({});
  const [response, setResponse] = useState("");
  const {
    categories,
    extentions,
    getAllCategories,
    getAllExtentions,
    uploadFile,
  } = useContext(FileContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    // const category = event.target.category.value;
    // const extention = event.target.extention.value;
    var formFile = new FormData();
    formFile.append("file", file);
    formFile.append("category", category._id);
    formFile.append("extention", extention._id);
    const response = await uploadFile(formFile);
    setResponse(response);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <h2 className="text-gray-700 font-bold mb-2">Upload file</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className="text-gray-700 font-bold mb-2">
              Category:{" "}
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              onClick={() => getAllCategories()}
              onChange={(event) => {
                getAllExtentions(event.target.value);
                setCategory(
                  categories.find(function (element) {
                    return element._id + "" === event.target.value + "";
                  })
                );
              }}
              required
            >
              {categories.map((category, index) => (
                <option
                  id="option"
                  key={index}
                  value={category._id}
                  className="text-gray-700 block px-4 py-2 text-sm"
                >
                  {category.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="extention" className="text-gray-700 font-bold mb-2">
              Extention:{" "}
            </label>
            <select
              id="extention"
              name="extention"
              className="mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              onChange={(event) => {
                setExtention(
                  extentions.find(function (element) {
                    return element._id + "" === event.target.value + "";
                  })
                );
              }}
              required
            >
              {extentions.map((extention, index) => (
                <option
                  key={index}
                  value={extention._id}
                  className="text-gray-700 block px-4 py-2 text-sm"
                >
                  {extention.name}
                </option>
              ))}
            </select>
            <br />
            <div className="mb-4">
              <label htmlFor="file" className="text-gray-700 font-bold mb-2">
                Choose a file to upload:{" "}
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="py-2 px-3 border border-gray-400 rounded-lg"
                accept={"." + extention.name}
                required
              />
            </div>
            <div className="items-center gap-2 mt-3 sm:flex">
              <button
                className="w-full mt-2 p-2.5 flex-1 hover:bg-blue-700 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                type="submit"
              >
                Upload
              </button>
              <button
                className="w-full mt-2 p-2.5 flex-1 hover:bg-blue-700 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
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
      </div>
    </div>
  );
}
