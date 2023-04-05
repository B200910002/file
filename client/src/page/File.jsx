import React from "react";
import { Outlet } from "react-router";
import { FileContext, FileProvider } from "../context/FileContext";

function File() {
  return (
    <FileProvider>
      <FileConsumer />
    </FileProvider>
  );
}

function FileConsumer() {
  return (
    <FileContext.Consumer>
      {(context) => (
        <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
          <Outlet />
        </div>
      )}
    </FileContext.Consumer>
  );
}

export default File;
