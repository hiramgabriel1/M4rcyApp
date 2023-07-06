import { Router } from "express";
import { createPost } from "../../controllers/users/post.create.js";

const router = Router();

router.post("/create", createPost);

export default router;