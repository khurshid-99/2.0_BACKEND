const userModel = require("../models/auth.model");
const followModel = require("../models/follow.model");

async function followUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  // console.log(followerId)

  const isFollowExists = await userModel.findById(followeeId);

  // console.log(isFollowExists)

  if (!isFollowExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (followerId === followeeId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following this ${followeeId} user`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerId,
    followee: followeeId,
  });

  return res.status(201).json({
    message: `You are now following ${followeeId} `,
    followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  if (followeeId === followerId) {
    return res.status(400).json({
      message: "You cannot unfollow your self",
    });
  }
  const isFollowExists = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (!isFollowExists) {
    return res.status(200).json({
      message: `"You are not following this user `,
    });
  }

  await followModel.findOneAndDelete({
    follower: followerId,
    followee: followeeId,
  });

  res.status(200).json({
    message: `You unfollowed this user.`,
  });
}

async function followStatusController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;
  const { status } = req.body;
  console.log(status);

  if (followeeId === followerId) {
    return res.status(409).json({
      message: "You cannot accecpt yourself requiest. ",
    });
  }

  const isFollow = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (!isFollow) {
    return res.status(409).json({
      message: `"You are not follow this user.`,
      user: followeeId,
    });
  }

  const followStatus = await followModel.findOneAndUpdate(
    {
      follower: followerId,
      followee: followeeId,
      status: "pending",
    },
    { status },
    { new: true },
  );

  return res.status(200).json({
    message: "Update follow status.",
    follow: followStatus,
  });
}

async function checkFollowStatus(req, res) {
  const myId = req.user.id;
  const otherUserId = req.params.id;

  console.log(myId, otherUserId)

  const isFollowing = await followModel.exists({
    follower: myId,
    followee: otherUserId,
  });

  const isFollowedBack = await followModel.exists({
    follower: otherUserId,
    followee: myId,
  });

  return res.status(200).json({
    isFollowing: Boolean(isFollowing),
    isFollowedBack: Boolean(isFollowedBack),
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  followStatusController,
  checkFollowStatus,
};
