import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {
  CATEGORIES_URL,
  CONFiG,
  EXTENTIONS_URL,
  FILES_URL,
  UPLOAD_FILE_URL,
} from "../config/URL";

export const FileContext = createContext({});

export function FileProvider(props) {
  const [files, setFiles] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [extentions, setExtentions] = useState([]);

  useEffect(() => {
    async function getAllFiles() {
      try {
        axios.get(FILES_URL, CONFiG).then((response) => {
          setFiles(response.data);
        });
      } catch (e) {
        console.log(e.message);
      }
    }

    getAllFiles();
  }, []);

  const getAllCategories = async () => {
    try {
      await axios.get(CATEGORIES_URL).then((response) => {
        setCategories(response.data);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAllExtentions = async (categoryID) => {
    try {
      await axios
        .post(EXTENTIONS_URL, { category: categoryID })
        .then((response) => {
          setExtentions(response.data);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const uploadFile = async (formFile) => {
    try {
      await axios.post(UPLOAD_FILE_URL, formFile, CONFiG);
      return "file uploaded";
    } catch (e) {
      return e.response.data;
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        selectedItemId,
        setSelectedItemId,
        categories,
        extentions,
        uploadFile,
        getAllCategories,
        getAllExtentions,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
}
