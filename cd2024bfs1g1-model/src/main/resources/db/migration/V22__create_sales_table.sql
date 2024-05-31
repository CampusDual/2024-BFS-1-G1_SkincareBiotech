CREATE TABLE public.sales (
	sal_id serial4 NOT NULL,
	sal_price numeric NOT NULL,
	sal_initial_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	sal_end_date timestamp NOT NULL,
	pro_id int4 NOT NULL,
	CONSTRAINT sales_pk PRIMARY KEY (sal_id),
	CONSTRAINT sales_products_fk FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

ALTER TABLE public.products DROP COLUMN pro_sale;

CREATE VIEW products_with_offer AS(
 	 WITH t AS (
	        SELECT pro_id, sal_price  FROM sales s
		    WHERE now() >= sal_initial_date AND now() <= sal_end_date
	 )
	 SELECT p.*, t.sal_price AS pro_sale
	 FROM products p
	 LEFT JOIN t ON p.pro_id = t.pro_id
);