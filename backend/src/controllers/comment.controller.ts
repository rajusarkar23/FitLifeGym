import { Request } from "express";
import { db } from "../lib/db";
import { commentSchema, member } from "../lib/db/schema";
import { eq, inArray } from "drizzle-orm";

// add a new comment
const addComment = async (req: Request, res: any) => {
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
    const createComment = await db
      .insert(commentSchema)
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again later.",
    });
  }
};

// fetch comments
const fetchComments = async (req: Request, res: any) => {
  const { ids } = req.body;

  try {
    const getComments = await db
      .select({
        id: commentSchema.id,
        comment: commentSchema.comment,
        commentFor: commentSchema.commentFor,
        commentByName: commentSchema.commentByName,
        commentByUserId: commentSchema.commentByUserIdId,
        userProfileUrl: member.profileImage
      })
      .from(commentSchema)
      .where(inArray(commentSchema.commentFor, ids)).leftJoin(member, eq(member.id, commentSchema.commentByUserIdId))

    if (getComments.length === 0) {
      return res.status(400).json({
        message: "No comment found",
        success: false,
      });
    }

    return res.status(200).json({ comments: getComments, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { addComment, fetchComments };
