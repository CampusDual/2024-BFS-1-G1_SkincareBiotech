ALTER TABLE public.products ADD cat_id int NULL;
ALTER TABLE public.products ADD CONSTRAINT products_categories_fk FOREIGN KEY (cat_id) REFERENCES public.categories(cat_id);
