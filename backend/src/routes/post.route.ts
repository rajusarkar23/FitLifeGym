import { Router } from "express";
import multer from "multer"
import { userAuthSession } from "../lib/middlewares";
import { create, fetchHomePosts, fetchPosts, uploadFile,  } from "../controllers/post.controller";
import { fetchLikes, manageLike } from "../controllers/like.controller";
import { addComment, fetchComments } from "../controllers/comment.controller";

const router = Router()
// using memory storage to get buffer
const memoryStorage = multer.memoryStorage()
// set storage to memory storage
const upload = multer({storage:memoryStorage})

router.post("/member/post/create", userAuthSession, create)
router.post("/member/post/upload-post-image",upload.single("file"), uploadFile)
router.get("/member/post/get-posts", userAuthSession, fetchPosts)
router.get("/member/post/get-home-posts", userAuthSession, fetchHomePosts)
router.post("/member/post/like/fetch", fetchLikes)
router.post("/member/post/like/manage", userAuthSession, manageLike)
router.post("/member/post/comment/add-comment", userAuthSession, addComment)
router.post("/member/post/comment/fetch-comments", userAuthSession, fetchComments)

export default router;