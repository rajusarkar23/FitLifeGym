CREATE TABLE "members" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"userName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"profileImage" text DEFAULT 'habibi.jpg' NOT NULL
);
