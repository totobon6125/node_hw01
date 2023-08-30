import express from 'express';
import postsRouter from './posts.js';
import commentsRouter from './comments.js';
const router = express.Router()

router.use("/post", [postsRouter, commentsRouter]) 

export default router;