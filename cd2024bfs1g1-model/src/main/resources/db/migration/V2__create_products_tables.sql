CREATE TABLE public.products (
	pro_id serial NOT NULL,
	pro_name varchar NOT NULL,
	pro_description varchar NOT NULL DEFAULT '' ,
	pro_price decimal NOT NULL,
	pro_image varchar NULL,
	CONSTRAINT products_pk PRIMARY KEY (pro_id)
);
