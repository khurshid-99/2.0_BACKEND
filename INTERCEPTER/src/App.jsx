import React from "react";
import { axiosInstance } from "./config/AxiosInstance";

const App = () => {
  async function getProducts() {
    try {
      const data = await axiosInstance.get("/products");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  getProducts();

  return <div>App</div>;
};

export default App;
