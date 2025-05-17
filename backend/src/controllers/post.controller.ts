import { Request } from "express";
import { db } from "../lib/db";
import { like, member, post } from "../lib/db/schema";
// s3 client and putobject
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";

// create post
const create = async (req: Request, res: any) => {
  const { textContent, postImageUrl } = req.body;

  //@ts-ignore
  const user = req.userId;

  if (typeof user !== "number") {
    return res.status(400).json({
      success: false,
      message: "User id is not correct.",
    });
  }

  try {
    const create = await db
      .insert(post)
      .values({
        postBelongTo: user,
        textContent: textContent,
        postImageUrl,
      })
      .returning();

    if (create.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Unable to create your post, try again",
      });
    }

    return res.status(200).json({ success: true, message: "Post created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// updload post image
const uploadFile = async (req: Request, res: any) => {
  // get file
  const file = req.file;
  // check
  if (typeof file !== "object" || typeof file.size !== "number") {
    return res.status(400).json({
      success: false,
      message: "File probably not available, please try again",
    });
  }

  // define the s3client
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `${process.env.CLOUDFLARE_ENDPOINT}`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true,
  });

  // filename
  const fileName = +new Date().getTime() + "_" + file.originalname;

  // upload params
  const uploadParams = {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: fileName,
    Body: Buffer.from(file.buffer),
    ContentType: file.mimetype,
  };

  try {
    const upload = await s3Client.send(new PutObjectCommand(uploadParams));
    if (upload.$metadata.httpStatusCode === 200) {
      return res.status(201).json({
        success: true,
        message: "Post image successfully",
        fileUrl: `${process.env.CLOUDFLARE_CDN_URL}/${fileName}`,
      });
    }
    // if failed, status code is not 200
    return res.status(400).json({
      success: false,
      message: "Post image upload failed.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// fetch posts
const fetchPosts = async (req: Request, res: any) => {
  // @ts-ignore
  const user = req.userId;

  // checks
  if (typeof user !== "number") {
    return res.status(400).json({
      successs: false,
      message: "User id is not valid, try again",
    });
  }

  try {
    const getPosts = await db
      .select({
        id: post.id,
        textContent: post.textContent,
        postImageUrl: post.postImageUrl,
        createdAt: post.createdAt,
        postCreator: member.name,
        createImageUrl: member.profileImage,
        likeBy: like.likeBy,
        likeFor: like.likeFor,
      })
      .from(post)
      .where(eq(post.postBelongTo, user))
      .leftJoin(member, eq(member.id, user))
      .leftJoin(like, eq(like.likeFor, post.id));

    if (getPosts.length === 0) {
      return res.status(400).json({
        successs: false,
        message: "You dont have any post yet",
      });
    }

    // getting posts in descending order
    const get = getPosts.sort((x, y) => {
      return Number(new Date(y.createdAt)) - Number(new Date(x.createdAt));
    });

    return res.status(201).json({
      success: true,
      message: "Posts fetched successfully",
      posts: get,
      fetchFor: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      successs: false,
      message: "Intenal server error",
    });
  }
};

// fetch posts for space home
const fetchHomePosts = async (req: Request, res: any) => {
  //@ts-ignore
  const user = req.userId;

  try {
    const fetch = await db
      .select({
        id: post.id,
        postBelongTo: post.postBelongTo,
        postImageUrl: post.postImageUrl,
        textContent: post.textContent,
        createdAt: post.createdAt,
        postCreatorImageUrl: member.profileImage,
        postCreatorName: member.name
      })
      .from(post)
      .leftJoin(member, eq(member.id, post.postBelongTo))

      const fetchPostsForHome = fetch.sort((x,y) => {
        return Number(new Date(y.createdAt)) - Number(new Date(x.createdAt))
      })

    return res
      .status(200)
      .json({ success: true, message: "Fetched", posts: fetchPostsForHome });
  } catch (error) {
    console.log(error);
  }
};

export { create, uploadFile, fetchPosts, fetchHomePosts };