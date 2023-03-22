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
        <>
          <Outlet />
        </>
      )}
    </FileContext.Consumer>
  );
}

export default File;
