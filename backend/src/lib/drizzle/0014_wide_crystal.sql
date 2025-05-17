CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"comment_for" integer,
	"comment_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "like_for" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "like_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_for_posts_id_fk" FOREIGN KEY ("comment_for") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_by_members_id_fk" FOREIGN KEY ("comment_by") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;