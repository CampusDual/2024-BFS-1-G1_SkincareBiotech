ALTER TABLE public.categories
DROP CONSTRAINT IF EXISTS categories_cat_name_check;

ALTER TABLE public.categories
ADD CONSTRAINT categories_cat_name_check
CHECK ((cat_name)::text ~ '^[A-Z][a-zA-Z0-9 ]*$'::text);
