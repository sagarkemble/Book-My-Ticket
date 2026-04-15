CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45) NOT NULL,
	"email" varchar(322) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"password" varchar(66),
	"verification_token" varchar,
	"refresh_token" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seat_no" varchar(10) NOT NULL,
	"is_booked" boolean DEFAULT false NOT NULL,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"booked_at" timestamp,
	CONSTRAINT "tickets_seat_no_unique" UNIQUE("seat_no")
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;