ALTER TABLE "members" ADD COLUMN "is_active" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "subscription_end" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "subscription_start" text;