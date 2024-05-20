ALTER TABLE public.orders DROP CONSTRAINT orders_products_fk;
ALTER TABLE public.orders DROP COLUMN pro_id;
ALTER TABLE public.orders DROP COLUMN ord_price;
ALTER TABLE public.orders ADD ord_date timestamp DEFAULT now() NOT NULL;


CREATE TABLE public.ord_lines (
	ol_id serial NOT NULL,
	ord_id integer NOT NULL,
	pro_id integer NOT NULL,
	ol_price integer NOT NULL,
	ol_units integer NOT NULL,
	CONSTRAINT ord_lines_pk PRIMARY KEY (ol_id),
	CONSTRAINT ord_lines_orders_fk FOREIGN KEY (ord_id) REFERENCES public.orders(ord_id),
	CONSTRAINT ord_lines_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false }, { "attr": "featuredPublic", "visible": false, "enabled": false }, { "attr": "history", "visible": false, "enabled": false }, { "attr": "login", "visible": false, "enabled": false }, { "attr": "cart", "visible": false, "enabled": false } ] }'
    WHERE rol_name= 'seller';

