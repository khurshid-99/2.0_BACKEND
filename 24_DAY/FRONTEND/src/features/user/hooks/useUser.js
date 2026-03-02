import { useContext, useEffect } from "react";
import { UserContext } from "../User.context";
import {
  handleFollow,
  handleUnfollow,
  handleGetFollowing,
  handleGetFollowers,
} from "../services/user.api";

export const useUser = () => {
  const context = useContext(UserContext);

  const {
    loding,
    setLoding,
    userDetils,
    setUserDetils,
    followers,
    setFollowers,
    following,
    setFollowing,
  } = context;
  // console.log(loding)

  const follow = async (username) => {
    setLoding(true);
    try {
      const respons = await handleFollow(username);
      console.log(respons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const unFollow = async (username) => {
    setLoding(true);
    try {
      const respons = await handleUnfollow(username);
      console.log(respons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleFollowing = async () => {
    setLoding(true);
    try {
      const respons = await handleGetFollowing();
      setFollowing(respons.followee);
      console.log(respons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };
  const handleFollowers = async () => {
    setLoding(true);
    try {
      const respons = await handleGetFollowers();
      setFollowers(respons.followers);
      // console.log(respons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    handleFollowing();
    handleFollowers();
  }, []);

  return {
    loding,
    userDetils,
    follow,
    unFollow,
    handleFollowing,
    handleFollowers,
    followers,
    following,
  };
};
