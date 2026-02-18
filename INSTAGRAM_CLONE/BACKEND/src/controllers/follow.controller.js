const userModel = require("../models/auth.model");
const followModel = require("../models/follow.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFollowExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFollowExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following this ${followeeUsername} user`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  return res.status(201).json({
    message: `You are now following ${followeeUsername} `,
    followRecord,
  });
}

module.exports = { followUserController };
