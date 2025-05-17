CREATE TYPE "public"."plan" AS ENUM('basic', 'premium', 'elite', 'none');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "is_plan_selected" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "selected_plan" "plan" DEFAULT 'none';