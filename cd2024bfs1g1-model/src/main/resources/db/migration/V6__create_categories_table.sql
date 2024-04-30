CREATE TABLE public.categories (
	cat_id serial NOT NULL,
	cat_name varchar NOT NULL,
	CONSTRAINT categories_pk PRIMARY KEY (cat_id)
);