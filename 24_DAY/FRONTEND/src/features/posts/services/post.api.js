import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const getFeed = async () => {
  const respons = await api.get("/feed");
  return respons.data;
};

export const createPost = async (file, caption) => {
  const formData = new FormData();

  formData.append("post", file);
  formData.append("caption", caption);

  const respons = await api.post("/", formData);

  return respons.data;
};

export const liked = async (postId) => {
  const respons = await api.post(`/like/${postId}`);

  return respons.data;
};
export const unLiked = async (postId) => {
  const respons = await api.post(`/unlike/${postId}`);

  return respons.data;
};
