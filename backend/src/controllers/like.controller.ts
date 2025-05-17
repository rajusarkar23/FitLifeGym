import e, { Request } from "express";
import { like, member } from "../lib/db/schema";
import { db } from "../lib/db";
import { eq, inArray } from "drizzle-orm";

// add like
const manageLike = async (req: Request, res: any) => {
  //@ts-ignore
  const user = req.userId;
  const { post } = req.body;

  const postIdToNum = Number(post);

  // checks
  if (typeof user !== "number" || typeof postIdToNum !== "number") {
    return res.status(400).json({
      success: false,
      message: "Invalid input types.",
    });
  }

  try {
    const findIfLikeAvailable = await db
      .select()
      .from(like)
      .where(eq(like.likeFor, postIdToNum))
      .leftJoin(member, eq(member.id, like.likeBy));

    // delete
    if (findIfLikeAvailable.length !== 0) {
      await db.delete(like).where(eq(like.id, findIfLikeAvailable[0].likes.id));
      return res.status(200).json({ message: "deleted" });
    }

    const add = await db
      .insert(like)
      .values({
        likeBy: user,
        likeFor: postIdToNum,
      })
      .returning();

    if (add.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Unable to add like, try again",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Success", likedFor: add[0].likeFor });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again.",
    });
  }
};

// fetch likes
const fetchLikes = async (req: Request, res: any) => {
  const { ids } = req.body;

  try {
    const getLikes = await db
      .select({ id: like.id, likeFor: like.likeFor, likeBy: like.likeBy })
      .from(like)
      .where(inArray(like.likeFor, ids));

    if (getLikes.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No likes found."
        })
    }
    return res.status(200).json({
      success: true,
      message: "Fetched",
      likes: getLikes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again.",
    });
  }
};

export { manageLike, fetchLikes };