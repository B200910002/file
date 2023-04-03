export const BASE_URL = `http://localhost:2000/api/v1`;
export const IMAGE_URL = `http://localhost:2000/api/v1/user/upload-pic`;
export const VIDEO_URL = `http://localhost:2000/public/video`;

export const IS_AUTHENCATED_URL = `${BASE_URL}/user/is-authencated`;
export const LOGIN_URL = `${BASE_URL}/user/login`;
export const REGISTER_URL = `${BASE_URL}/user/register`;
export const USER_URL = `${BASE_URL}/user/`;
export const EDIT_USER_URL = `${BASE_URL}/user/edit`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}/user/change-password`;

export const CONFiG = {
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).token
        : " "
    }`,
  },
};

export const FILE_IMG_URL = `http://localhost:2000/public/dot/file.png`;
export const FILES_URL = `${BASE_URL}/file/`;
export const CATEGORIES_URL = `${BASE_URL}/file/categories`;
export const EXTENTIONS_URL = `${BASE_URL}/file/extentions`;
export const UPLOAD_FILE_URL = `${BASE_URL}/file/upload`;
