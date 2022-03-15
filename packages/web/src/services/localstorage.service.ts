import moment from "moment";
const LOCALSTORAGE_AUTH_USER = "AuthUser";
const LOCALSTORAGE_TOKEN_KEY = "AuthToken";
const LOCALSTORAGE_REFRESH_TOKEN_KEY = "AuthRefreshToken";
const LOCALSTORAGE_USERNAME = "UserName";

const getUserDetail = () => {
   let userDetailData = localStorage.getItem(LOCALSTORAGE_AUTH_USER);
   if (userDetailData) return JSON.parse(userDetailData);
   return null;
};

const isAuthenticated = () => {
   if (
      localStorage.getItem(LOCALSTORAGE_AUTH_USER) ||
      getAuthorizationToken()
   ) {
      return true;
   }
   return false;
};

const storeAuthToken = (token) => {
   localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
};
const storeAuthRefreshToken = (token) => {
   localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_KEY, token);
};
const storeUserSub = (token) => {
   localStorage.setItem(LOCALSTORAGE_USERNAME, token);
};

const removeAuthToken = () => {
   localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
};
const getAuthRefreshToken = () => {
   localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
};

const getAuthorizationToken = () => {
   return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
};
const getUserSub = () => {
   return localStorage.getItem(LOCALSTORAGE_USERNAME);
};

const storeAuthUser = (data) => {
   localStorage.setItem(LOCALSTORAGE_AUTH_USER, JSON.stringify(data));
};

const clearLocalStorage = () => {
   localStorage.clear();
};

export const localStorageService = {
   getUserDetail,
   getAuthorizationToken,
   storeAuthUser,
   clearLocalStorage,
   storeAuthToken,
   removeAuthToken,
   isAuthenticated,
   storeUserSub,
   getUserSub,
   storeAuthRefreshToken,
   getAuthRefreshToken,
};
