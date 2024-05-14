import AxiosInstance from "axios";

import { USER_TOKEN_LOCALSTORAGE_KEY } from "./constants/app.js";

const http = AxiosInstance.create({
  baseURL: "http://localhost/api/",
});

http.interceptors.request.use(
  (config) => {
    const tokenData = JSON.parse(
      localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY) || null
    );

    if (tokenData) {
      const bearerToken = tokenData.token;

      config.headers.Authorization = `Bearer ${bearerToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data.message;

      if (message) {
        alert(message);
      } else {
        alert(JSON.stringify(error.response.data, null, 2));
      }
    }

    return Promise.reject(error);
  }
);

export default http;
