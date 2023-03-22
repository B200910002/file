import React, { Component } from "react";
import { Outlet } from "react-router";
import { FileContext, FileProvider } from "../context/FileContext";

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FileProvider>
        <FileConsumer />
      </FileProvider>
    );
  }
}

class FileConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = FileContext;
  render() {
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
}

export default File;
