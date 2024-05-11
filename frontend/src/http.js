import AxiosInstance from "axios";

const http = AxiosInstance.create({
  baseURL: "http://localhost/api/",
});

http.interceptors.request.use(
  (config) => {
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
