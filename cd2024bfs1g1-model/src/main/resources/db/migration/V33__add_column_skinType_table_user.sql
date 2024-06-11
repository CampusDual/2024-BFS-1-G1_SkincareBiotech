ALTER TABLE public.usr_profile ADD skin_id int4 NULL;
ALTER TABLE public.usr_profile ADD CONSTRAINT usr_profile_skin_types_fk FOREIGN KEY (skin_id) REFERENCES public.skin_types(skin_id);
UPDATE public.usr_profile SET skin_id = 3 WHERE skin_id IS NULL;
ALTER TABLE public.usr_profile ALTER COLUMN skin_id SET NOT NULL;