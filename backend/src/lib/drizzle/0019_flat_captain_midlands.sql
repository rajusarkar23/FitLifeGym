ALTER TABLE "comments" RENAME COLUMN "comment_by" TO "comment_by_name";--> statement-breakpoint
ALTER TABLE "comments" RENAME COLUMN "comment_by_id_user" TO "comment_by_userId";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_comment_by_id_user_members_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_by_userId_members_id_fk" FOREIGN KEY ("comment_by_userId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;