CREATE TYPE "public"."gender" AS ENUM('not_selected', 'male', 'female');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "profession" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "gender" "gender";--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "dob" text;