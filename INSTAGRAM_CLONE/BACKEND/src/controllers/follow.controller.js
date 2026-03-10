const userModel = require("../models/auth.model");
const followModel = require("../models/follow.model");

async function followUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  if (followerId === followeeId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const userExists = await userModel.findById(followeeId);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const follow = await followModel.findOneAndUpdate(
    { follower: followerId, followee: followeeId },
    { follower: followerId, followee: followeeId, status: "accepted" },
    { upsert: true, returnDocument: "after" },
  );

  return res.status(200).json({
    message: "ok",
    friendship_status: {
      following: true,
      requested: false,
    },
  });
}

async function unfollowUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  if (followerId === followeeId) {
    return res.status(400).json({
      message: "You cannot unfollow yourself",
    });
  }

  await followModel.findOneAndDelete({
    follower: followerId,
    followee: followeeId,
  });

  return res.status(200).json({
    message: "ok",
    friendship_status: {
      following: false,
      requested: false,
    },
  });
}
async function followStatusController(req, res) {
  const followerId = req.params.followerId; // who sent request
  const followeeId = req.user.id; // current logged user
  const { status } = req.body; // accepted or rejected

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  const follow = await followModel.findOneAndUpdate(
    {
      follower: followerId,
      followee: followeeId,
      status: "pending",
    },
    { status },
    { returnDocument: "after" },
  );

  if (!follow) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  return res.status(200).json({
    message: "ok",
    friendship_status: {
      following: status === "accepted",
      requested: false,
    },
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  followStatusController,
};
