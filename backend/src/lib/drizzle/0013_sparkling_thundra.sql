CREATE TABLE "likes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "likes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"like_for" integer,
	"like_by" integer
);
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_like_for_posts_id_fk" FOREIGN KEY ("like_for") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_like_by_members_id_fk" FOREIGN KEY ("like_by") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;