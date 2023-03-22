import axios from "axios";
import React, { Component, createContext } from "react";
import {
  CATEGORIES_URL,
  CONFiG,
  EXTENTIONS_URL,
  FILES_URL,
  UPLOAD_FILE_URL,
} from "../config/URL";

export const FileContext = createContext({});

export class FileProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], categories: [], extentions: [] };
  }

  componentDidMount = () => {
    this.getAllFiles();
  };

  getAllFiles = async () => {
    try {
      await axios.get(FILES_URL, CONFiG).then((response) => {
        this.setState({ files: response.data });
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  getAllCategories = async () => {
    try {
      await axios.get(CATEGORIES_URL).then((response) => {
        this.setState({ categories: response.data });
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  getAllExtentions = async (categoryID) => {
    try {
      await axios
        .post(EXTENTIONS_URL, { category: categoryID })
        .then((response) => {
          this.setState({ extentions: response.data });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  uploadFile = async (event) => {
    try {
      const file = event.target.file.files[0];
      const category = event.target.category.value;
      const extention = event.target.extention.value;
      var formFile = new FormData();
      formFile.append("file", file);
      formFile.append("category", category);
      formFile.append("extention", extention);
      await axios.post(UPLOAD_FILE_URL, formFile, CONFiG).then((response) => {
        this.setState({ file: response.data });
      });
      return "file uploaded";
    } catch (e) {
      return e.response.data;
    }
  };

  render() {
    const { files, categories, extentions } = this.state;
    const { uploadFile, getAllCategories, getAllExtentions } = this;
    return (
      <FileContext.Provider
        value={{
          files,
          categories,
          extentions,
          uploadFile,
          getAllCategories,
          getAllExtentions,
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
