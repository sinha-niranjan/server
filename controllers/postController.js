const postModel = require("../models/postModel");

// create post

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    // validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Pleaes provide all fields",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(200).send({
      success: true,
      message: "post created Successfully",
      post,
    });
    // console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in create post api",
      error,
    });
  }
};

// GET ALL POSTS
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "All posts data ",
      posts,
    });
  } catch (error0) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all posts api ",
      error,
    });
  }
};

module.exports = { createPostController, getAllPostsController };
