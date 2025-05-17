ALTER TABLE "members" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "updated_at" timestamp;