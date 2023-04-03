import React, { useContext } from "react";
import { FILE_IMG_URL } from "../config/URL";
import { FileContext } from "../context/FileContext";
import classNames from "classnames";

function GridItem({ item, isSelected, onSelect }) {
  const classes = classNames(
    "rounded overflow-hidden border border-gray-400 rounded-lg",
    isSelected ? "bg-blue-200" : "bg-white"
  );

  return (
    <div className={classes} onClick={() => onSelect(item._id)}>
      <div className="px-6 py-4 flex justify-center">
        <img
          src={FILE_IMG_URL}
          style={{ width: "100px", height: "100px" }}
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <p className="text-gray-700 text-base">{item.name}</p>
      </div>
    </div>
  );
}

function Files() {
  const { files, selectedItemId, setSelectedItemId } = useContext(FileContext);

  const handleSelectItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
      <h2 className="text-gray-700 font-bold mb-2">Your files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((file) => (
          <GridItem
            key={file._id}
            item={file}
            isSelected={file._id === selectedItemId}
            onSelect={handleSelectItem}
          />
        ))}
      </div>
    </div>
  );
}

export default Files;
