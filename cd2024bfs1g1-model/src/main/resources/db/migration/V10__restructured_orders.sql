ALTER TABLE public.orders DROP CONSTRAINT orders_products_fk;
ALTER TABLE public.orders DROP COLUMN pro_id;
ALTER TABLE public.orders DROP COLUMN ord_price;

CREATE TABLE public.ord_lines (
	ol_id serial NOT NULL,
	pro_id integer NOT NULL,
	ol_price integer NOT NULL,
	ol_units integer NOT NULL,
	CONSTRAINT ord_lines_pk PRIMARY KEY (ol_id),
	CONSTRAINT ord_lines_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

ALTER TABLE public.orders ADD ol_id integer NOT NULL;
ALTER TABLE public.orders ADD CONSTRAINT orders_ord_lines_fk FOREIGN KEY (ol_id) REFERENCES public.ord_lines(ol_id);