alter table "public"."flags"
           add constraint "flags_client_id_fkey"
           foreign key ("client_id")
           references "public"."clients"
           ("id") on update restrict on delete restrict;
