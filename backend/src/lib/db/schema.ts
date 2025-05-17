import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { profileImage } from "../../config";

export const genderEnum = pgEnum("gender", ["male", "female"])
export const planEnum = pgEnum("plan", ["basic", "premium", "elite", "none"])

// members table
export const member = pgTable("members",{
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    userName: text("user_name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    otp: text("otp").notNull(),
    isAccountVerified: boolean("is_account_verified").default(false),
    isPlanSelected: boolean("is_plan_selected").default(false),
    selectedPlan: planEnum("selected_plan").default("none"),
    profileImage: text("profile_image").notNull().default(`${profileImage}`),
    profession: text("profession"),
    gender: genderEnum("gender"),
    dob: text("dob"),
    isAactive: boolean("is_active").default(false),
    subscriptionEnd: text("subscription_end"),
    subscriptionStart: text("subscription_start"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
})

// admin table
export const admin = pgTable("admins",{
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  otp: text("otp").notNull(),
  isAccountVerified: boolean("is_account_verified").default(false),
  profileImage: text("profile_image").notNull().default(`${profileImage}`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
})

// posts table
export const post = pgTable("posts", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    textContent: text("text_content").notNull(),
    postImageUrl: text("post_image_url"),
    postBelongTo: integer("post_belong_to")
      .notNull()
      .references(() => member.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at  ")
      .notNull()
      .$onUpdate(() => new Date()),
  });

// like table
export const like = pgTable("likes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  likeFor: integer("like_for").notNull().references(() => post.id, {onDelete: "cascade"}),
  likeBy: integer("like_by").notNull().references(() => member.id, {onDelete: "cascade"}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
}) 

// comments table
export const commentSchema = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  comment: text("comment").notNull(),
  commentFor: integer("comment_for").notNull().references(() => post.id, {onDelete: "cascade"}),
  commentByName: text("comment_by_name").notNull(),
  commentByUserIdId: integer("comment_by_userId").notNull().references(() => member.id, {onDelete: "cascade"}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})
  