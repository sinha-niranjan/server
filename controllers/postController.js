const postModel = require('../models/postModel')

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

module.exports = { createPostController };
