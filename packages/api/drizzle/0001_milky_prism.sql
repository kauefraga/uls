ALTER TABLE "sales" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "sales" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;