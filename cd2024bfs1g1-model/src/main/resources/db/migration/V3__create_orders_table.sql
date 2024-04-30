CREATE TABLE public.orders (
	ord_id serial NOT NULL,
	pro_id integer NOT NULL,
	ord_name varchar(1000) NOT NULL,
	ord_phone bigint NOT NULL,
	ord_zipcode int NOT NULL,
	ord_address varchar(1000) NOT NULL,
	ord_sent boolean DEFAULT false NOT NULL,
	CONSTRAINT orders_pk PRIMARY KEY (ord_id)
);

ALTER TABLE public.orders ADD CONSTRAINT orders_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id);