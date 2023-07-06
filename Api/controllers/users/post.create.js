import { Post } from "../../models/Post.js";

const createPost = async (req, res) => {
  try {
    // obtener datos de la publicación
    const { asset_post, type_post, description_post, date_post } = req.body;

    // crear publicación
    const newPost = await Post.create({
      asset_post,
      type_post,
      description_post,
      date_post,
    });

    res.json({
      message: `publicación añadida con éxito! ${newPost}`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { createPost };
