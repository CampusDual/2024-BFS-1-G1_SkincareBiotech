CREATE TABLE public.commissions (
	com_id serial4 NOT NULL,
	com_name varchar NOT NULL,
	com_value numeric NOT NULL,
	CONSTRAINT commissions_pk PRIMARY KEY (com_id)
);

INSERT INTO commissions (COM_NAME, COM_VALUE) VALUES ('Redsys_commissions', 1);
INSERT INTO commissions (COM_NAME, COM_VALUE) VALUES ('Plataform_commissions', 3);

CREATE OR REPLACE VIEW public.user_price
AS WITH cr AS (
         SELECT c.com_value AS com_redsys
           FROM commissions c
          WHERE c.com_name::text = 'Redsys_commissions'::text
        ), cp AS (
         SELECT c.com_value AS com_pla
           FROM commissions c
          WHERE c.com_name::text = 'Plataform_commissions'::text
        )
SELECT p.pro_id,
    (p.pro_price / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100)) AS "USER_FINAL_PRICE",
    (p.pro_sale / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100)) AS "USER_FINAL_PRICE_SALE"
   FROM products p,
    cr,
    cp;