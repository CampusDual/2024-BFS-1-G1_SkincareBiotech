CREATE TABLE public.sales (
	sal_id serial4 NOT NULL,
	sal_price numeric NOT NULL,
	sal_idate timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	sal_edate timestamp NOT NULL,
	pro_id int4 NOT NULL,
	CONSTRAINT sales_pk PRIMARY KEY (sal_id),
	CONSTRAINT sales_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

ALTER TABLE public.products DROP COLUMN pro_sale;