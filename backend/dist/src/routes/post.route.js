"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../lib/middlewares");
const post_controller_1 = require("../controllers/post.controller");
const like_controller_1 = require("../controllers/like.controller");
const comment_controller_1 = require("../controllers/comment.controller");
const router = (0, express_1.Router)();
// using memory storage to get buffer
const memoryStorage = multer_1.default.memoryStorage();
// set storage to memory storage
const upload = (0, multer_1.default)({ storage: memoryStorage });
router.post("/member/post/create", middlewares_1.userAuthSession, post_controller_1.create);
router.post("/member/post/upload-post-image", upload.single("file"), post_controller_1.uploadFile);
router.get("/member/post/get-posts", middlewares_1.userAuthSession, post_controller_1.fetchPosts);
router.get("/member/post/get-home-posts", middlewares_1.userAuthSession, post_controller_1.fetchHomePosts);
router.post("/member/post/like/fetch", like_controller_1.fetchLikes);
router.post("/member/post/like/manage", middlewares_1.userAuthSession, like_controller_1.manageLike);
router.post("/member/post/comment/add-comment", middlewares_1.userAuthSession, comment_controller_1.addComment);
router.post("/member/post/comment/fetch-comments", middlewares_1.userAuthSession, comment_controller_1.fetchComments);
exports.default = router;
