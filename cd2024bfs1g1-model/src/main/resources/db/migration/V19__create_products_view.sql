CREATE TABLE public.products_view (
	prov_id serial4 NOT NULL,
	prov_uid varchar NOT NULL,
	pro_id int4 NOT NULL,
	prov_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT products_view_pk PRIMARY KEY (prov_id),
	CONSTRAINT products_view_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);