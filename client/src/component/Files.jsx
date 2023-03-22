import React, { useContext } from "react";
import { FILE_IMG_URL } from "../config/URL";
import { FileContext } from "../context/FileContext";

export default function Files() {
  const { files } = useContext(FileContext);
  return (
    <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
      <h2 className="text-gray-700 font-bold mb-2">Your files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className=" rounded overflow-hidden border border-gray-400 rounded-lg"
          >
            <div className="px-6 py-4 flex justify-center">
              <img
                src={FILE_IMG_URL}
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
            </div>
            <div className="flex justify-center">
              <p className="text-gray-700 text-base">{file.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
