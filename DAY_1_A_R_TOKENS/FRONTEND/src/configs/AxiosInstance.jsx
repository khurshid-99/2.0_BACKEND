import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log(error);
    const orginalReq = error.config;

    if (error.response.status === 401 || !orginalReq.retry) {
      orginalReq.retry = true;
      try {
        await axiosInstance.get("/auth/get-accesstoken");
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }
      console.log(`Call api`);
    }
  },
);

// ---

// axiosInstance.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest.retry &&
//       originalRequest.url !== "/api/auth/me"
//     ) {
//       originalRequest.retry = true;

//       try {
//         await axiosInstance.get("/api/auth/get-accessToken");

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
