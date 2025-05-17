CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text_content" text NOT NULL,
	"post_image_url" text,
	"post_belong_to" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"updated_at  " timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_belong_to_members_id_fk" FOREIGN KEY ("post_belong_to") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;