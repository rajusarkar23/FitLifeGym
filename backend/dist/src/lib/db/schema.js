"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.like = exports.post = exports.admin = exports.member = exports.planEnum = exports.genderEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const config_1 = require("../../config");
exports.genderEnum = (0, pg_core_1.pgEnum)("gender", ["male", "female"]);
exports.planEnum = (0, pg_core_1.pgEnum)("plan", ["basic", "premium", "elite", "none"]);
// members table
exports.member = (0, pg_core_1.pgTable)("members", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.text)("name").notNull(),
    userName: (0, pg_core_1.text)("user_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    otp: (0, pg_core_1.text)("otp").notNull(),
    isAccountVerified: (0, pg_core_1.boolean)("is_account_verified").default(false),
    isPlanSelected: (0, pg_core_1.boolean)("is_plan_selected").default(false),
    selectedPlan: (0, exports.planEnum)("selected_plan").default("none"),
    profileImage: (0, pg_core_1.text)("profile_image").notNull().default(`${config_1.profileImage}`),
    profession: (0, pg_core_1.text)("profession"),
    gender: (0, exports.genderEnum)("gender"),
    dob: (0, pg_core_1.text)("dob"),
    isAactive: (0, pg_core_1.boolean)("is_active").default(false),
    subscriptionEnd: (0, pg_core_1.text)("subscription_end"),
    subscriptionStart: (0, pg_core_1.text)("subscription_start"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().$onUpdate(() => new Date())
});
// admin table
exports.admin = (0, pg_core_1.pgTable)("admins", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.text)("name").notNull(),
    userName: (0, pg_core_1.text)("user_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    otp: (0, pg_core_1.text)("otp").notNull(),
    isAccountVerified: (0, pg_core_1.boolean)("is_account_verified").default(false),
    profileImage: (0, pg_core_1.text)("profile_image").notNull().default(`${config_1.profileImage}`),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().$onUpdate(() => new Date())
});
// posts table
exports.post = (0, pg_core_1.pgTable)("posts", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedAlwaysAsIdentity(),
    textContent: (0, pg_core_1.text)("text_content").notNull(),
    postImageUrl: (0, pg_core_1.text)("post_image_url"),
    postBelongTo: (0, pg_core_1.integer)("post_belong_to")
        .notNull()
        .references(() => exports.member.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at  ")
        .notNull()
        .$onUpdate(() => new Date()),
});
// like table
exports.like = (0, pg_core_1.pgTable)("likes", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedAlwaysAsIdentity(),
    likeFor: (0, pg_core_1.integer)("like_for").notNull().references(() => exports.post.id, { onDelete: "cascade" }),
    likeBy: (0, pg_core_1.integer)("like_by").notNull().references(() => exports.member.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").$onUpdate(() => new Date())
});
// comments table
exports.commentSchema = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedAlwaysAsIdentity(),
    comment: (0, pg_core_1.text)("comment").notNull(),
    commentFor: (0, pg_core_1.integer)("comment_for").notNull().references(() => exports.post.id, { onDelete: "cascade" }),
    commentByName: (0, pg_core_1.text)("comment_by_name").notNull(),
    commentByUserIdId: (0, pg_core_1.integer)("comment_by_userId").notNull().references(() => exports.member.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").$onUpdate(() => new Date())
});
