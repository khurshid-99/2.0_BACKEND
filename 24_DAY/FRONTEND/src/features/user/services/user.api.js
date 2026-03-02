import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: true,
});

export const handleFollow = async (username) => {
  const respons = await api.post(`/follow/${username}`);

  return respons.data;
};

export const handleUnfollow = async (username) => {
  const respons = await api.post(`/unfollow/${username}`);

  return respons.data;
};

export const handleGetFollowing = async () => {
  const respons = await api.get(`/following`);

  return respons.data;
};

export const handleGetFollowers = async () => {
  const respons = await api.get(`/followers`);

  return respons.data;
};
