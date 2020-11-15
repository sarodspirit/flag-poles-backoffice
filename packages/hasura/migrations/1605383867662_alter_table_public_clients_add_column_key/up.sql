CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."clients" ADD COLUMN "key" uuid NOT NULL DEFAULT gen_random_uuid();
