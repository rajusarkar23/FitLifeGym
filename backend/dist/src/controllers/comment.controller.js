"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchComments = exports.addComment = void 0;
const db_1 = require("../lib/db");
const schema_1 = require("../lib/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
// add a new comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, userName, commentFor } = req.body;
    //@ts-ignore
    const user = req.userId;
    if (typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "Invalid Id, login again",
        });
    }
    try {
        const createComment = yield db_1.db
            .insert(schema_1.commentSchema)
            .values({
            comment,
            commentByName: userName,
            commentByUserIdId: user,
            commentFor,
        })
            .returning();
        if (createComment.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Not able to post the comment try again later",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Comment created Successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, please try again later.",
        });
    }
});
exports.addComment = addComment;
// fetch comments
const fetchComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        const getComments = yield db_1.db
            .select({
            id: schema_1.commentSchema.id,
            comment: schema_1.commentSchema.comment,
            commentFor: schema_1.commentSchema.commentFor,
            commentByName: schema_1.commentSchema.commentByName,
            commentByUserId: schema_1.commentSchema.commentByUserIdId,
            userProfileUrl: schema_1.member.profileImage
        })
            .from(schema_1.commentSchema)
            .where((0, drizzle_orm_1.inArray)(schema_1.commentSchema.commentFor, ids)).leftJoin(schema_1.member, (0, drizzle_orm_1.eq)(schema_1.member.id, schema_1.commentSchema.commentByUserIdId));
        if (getComments.length === 0) {
            return res.status(400).json({
                message: "No comment found",
                success: false,
            });
        }
        return res.status(200).json({ comments: getComments, success: true });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.fetchComments = fetchComments;
