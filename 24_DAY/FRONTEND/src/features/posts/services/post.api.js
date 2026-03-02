import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const getFeed = async () => {
  const respons = await api.get("/posts/feed");
  return respons.data;
};

export const createPost = async (file, caption) => {
  const formData = new FormData();

  formData.append("post", file);
  formData.append("caption", caption);

  const respons = await api.post("/posts/", formData);

  return respons.data;
};

export const liked = async (postId) => {
  const respons = await api.post(`/posts/like/${postId}`);

  return respons.data;
};

export const unLiked = async (postId) => {
  const respons = await api.post(`/posts/unlike/${postId}`);

  return respons.data;
};

export const followUser = async (id) => {
  const respons = await api.post(`/user/follow/${id}`);

  return respons.data;
};

export const unFollowUser = async (id) => {
  const respons = await api.post(`/user/unfollow/${id}`);

  return respons.data;
};
