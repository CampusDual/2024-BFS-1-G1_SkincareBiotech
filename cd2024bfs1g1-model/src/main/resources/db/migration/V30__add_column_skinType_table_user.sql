ALTER TABLE public.usr_profile ADD skin_id int4 NULL;
ALTER TABLE public.usr_profile ADD CONSTRAINT usr_profile_skin_types_fk FOREIGN KEY (skin_id) REFERENCES public.skin_types(skin_id);