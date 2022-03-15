import axios from "axios";
import { getApiUrl, API_URLS } from "../config/api.config";
import { errorMessages } from "../config/messages.config";
import { localStorageService } from "./localstorage.service";
import toast from "react-hot-toast";

// declare a request interceptor
axios.interceptors.request.use(
   (request) => {
      if (request.method?.toUpperCase() === "POST") {
         request.headers!["Content-Type"] = "application/json";
      }
      const isLoggedIn = localStorageService.isAuthenticated();
      const token = localStorageService.getAuthorizationToken();
      if (isLoggedIn || token) {
         const token = localStorageService.getAuthorizationToken();
         request.headers!.Authorization = `Bearer ${token}`;
      }
      return request;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// declare a response interceptor
axios.interceptors.response.use(
   (response) => {
      // do something with the response data
      return Promise.resolve(response);
   },
   (error) => {
      // handle the response error
      const { response } = error;

      if (response) {
         const { status, data } = response;
         // place your reentry code
         if (status === 401) {
            return Promise.reject(data);
         } else {
            return Promise.reject(data);
         }
      } else {
         if (error.message === "Network Error") {
            return Promise.reject(errorMessages.API_NOT_AVAILABLE);
         } else {
            return Promise.reject(error.message);
         }
      }
   }
);

/* api methods */
const login = (username, password) => {
   return axios
      .post(getApiUrl(API_URLS.LOGIN), { username, password })
      .then((response) => {
         if (response.status === 200) {
            localStorageService.storeAuthUser(response);
         }
         return response;
      });
};

const logout = () => {
   localStorageService.clearLocalStorage();
};

const get = (endpoint, onsuccess, onfinally?) => {
   return axios
      .get(getApiUrl(endpoint), { timeout: 10000 })
      .then((response) => {
         if (response.data.status && response.data.status !== 200) {
            toast.error(response.data.message);
            return;
         }
         onsuccess(response.data);
      })
      .catch((error) => {
         toast.error(error.message);
      })
      .finally(() => {
         onfinally();
      });
};

const post = (endpoint, data, onsuccess, onfinally?) => {
   return axios
      .post(getApiUrl(endpoint), data)
      .then((response) => {
         if (response.data.status && response.data.status !== 200) {
            toast.error(response.data.message);
            return;
         }
         onsuccess(response.data);
      })
      .catch((error) => {
         toast.error(error.message);
      })
      .finally(() => {
         onfinally();
      });
};

const postAsync = async (endpoint, data) => {
   return await axios.post(getApiUrl(endpoint), data);
};

const postFile = (endpoint, formData) => {
   return axios.post(getApiUrl(endpoint), formData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

export const apiService = {
   get,
   post,
   postAsync,
   login,
   logout,
   postFile,
};
