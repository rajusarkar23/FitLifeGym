CREATE TABLE "admins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "admins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"otp" text NOT NULL,
	"is_account_verified" boolean DEFAULT false,
	"profile_image" text DEFAULT 'https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.svg' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
