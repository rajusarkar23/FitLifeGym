ALTER TABLE "comments" DROP CONSTRAINT "comments_comment_by_members_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "comment_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "comment_by_id_user" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_by_id_user_members_id_fk" FOREIGN KEY ("comment_by_id_user") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;