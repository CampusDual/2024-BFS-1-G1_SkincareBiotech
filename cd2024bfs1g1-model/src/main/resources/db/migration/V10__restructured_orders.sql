ALTER TABLE public.orders DROP CONSTRAINT orders_products_fk;
ALTER TABLE public.orders DROP COLUMN pro_id;

CREATE TABLE public.ord_detail (
	od_id serial NOT NULL,
	pro_id integer NOT NULL,
	od_units integer NOT NULL,
	CONSTRAINT ord_detail_pk PRIMARY KEY (od_id),
	CONSTRAINT ord_detail_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

ALTER TABLE public.orders ADD od_id integer NOT NULL;
ALTER TABLE public.orders ADD CONSTRAINT orders_ord_detail_fk FOREIGN KEY (od_id) REFERENCES public.ord_detail(od_id);