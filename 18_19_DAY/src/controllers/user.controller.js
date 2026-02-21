const followModel = require("../models/follow.model");
const userModel = require("../models/auth.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exits",
    });
  }

  const isAlreadyFollowingExists = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowingExists) {
    return res.status(200).json({
      message: `You already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followeeUsername: followeeUsername,
  });

  return res.status(201).json({
    message: `You are now following ${followeeUsername} `,
    follow: followRecord,
  });
}

async function unfollowController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You connot unfollow yourself.",
    });
  }

  const isUserFollowingExists = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowingExists) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername} `,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowingExists._id);

  return res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

module.exports = { followController, unfollowController };
