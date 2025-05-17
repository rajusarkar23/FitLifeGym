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
exports.fetchLikes = exports.manageLike = void 0;
const schema_1 = require("../lib/db/schema");
const db_1 = require("../lib/db");
const drizzle_orm_1 = require("drizzle-orm");
// add like
const manageLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const findIfLikeAvailable = yield db_1.db
            .select()
            .from(schema_1.like)
            .where((0, drizzle_orm_1.eq)(schema_1.like.likeFor, postIdToNum))
            .leftJoin(schema_1.member, (0, drizzle_orm_1.eq)(schema_1.member.id, schema_1.like.likeBy));
        // delete
        if (findIfLikeAvailable.length !== 0) {
            yield db_1.db.delete(schema_1.like).where((0, drizzle_orm_1.eq)(schema_1.like.id, findIfLikeAvailable[0].likes.id));
            return res.status(200).json({ message: "deleted" });
        }
        const add = yield db_1.db
            .insert(schema_1.like)
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again.",
        });
    }
});
exports.manageLike = manageLike;
// fetch likes
const fetchLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        const getLikes = yield db_1.db
            .select({ id: schema_1.like.id, likeFor: schema_1.like.likeFor, likeBy: schema_1.like.likeBy })
            .from(schema_1.like)
            .where((0, drizzle_orm_1.inArray)(schema_1.like.likeFor, ids));
        if (getLikes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No likes found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched",
            likes: getLikes,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again.",
        });
    }
});
exports.fetchLikes = fetchLikes;
