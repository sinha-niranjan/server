const { compareSync } = require("bcrypt");
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

// get user posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user post api",
      error,
    });
  }
};

// delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted ! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete post api",
      error,
    });
  }
};

// update post

const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    // post find
    const post = await postModel.findByIdAndUpdate({ _id: req.params.id });

    //  validation

    if (!title || !description) {
      return res.status(500).send({
        success: fale,
        message: "Please provide post title and descrition",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Post updated Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update post api",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
