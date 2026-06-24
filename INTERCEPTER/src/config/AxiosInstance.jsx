import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// axiosInstance.interceptors.request.use()
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios instance respons", response);
    return response; // if not return RESPONS then data will not go on UI, and same as error
  },
  (error) => {
    console.log(`error in instance ${error}`);
    return error;
  },
);
