CREATE TABLE public.categories (cat_id serial NOT NULL,
                                cat_name varchar NOT NULL,
                                CONSTRAINT categories_pk PRIMARY KEY (cat_id) );
ALTER TABLE public.products ADD cat_id int NULL;
ALTER TABLE public.products ADD CONSTRAINT products_categories_fk FOREIGN KEY (cat_id) REFERENCES public.categories(cat_id);
