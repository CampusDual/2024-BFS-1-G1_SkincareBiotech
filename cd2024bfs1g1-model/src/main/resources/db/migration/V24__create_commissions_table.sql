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
   ROUND((p.pro_price / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100)),2) AS user_final_price,
   ROUND((p.pro_sale / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100)),2) AS user_final_price_sale,
   ROUND(COALESCE((p.pro_sale / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100)), (p.pro_price / (1 - (cp.com_pla::numeric/100))) / (1-(cr.com_redsys::numeric/100))),2) as user_final_price_checked_sale
  FROM products p,
   cr,
   cp;

UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false }, { "attr": "featuredPublic", "visible": false, "enabled": false }, { "attr": "history", "visible": false, "enabled": false }, { "attr": "login", "visible": false, "enabled": false }, { "attr": "cart", "visible": false, "enabled": false }, { "attr": "sellers", "visible": false, "enabled": false }, { "attr": "commissions", "visible": false, "enabled": false } ] }'
    WHERE rol_name= 'seller';

UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "products", "visible": false, "enabled": false },
                                       { "attr": "orders", "visible": false, "enabled": false },
                                       { "attr": "brands", "visible": false, "enabled": false },
                                       { "attr": "categories", "visible": false, "enabled": false },
                                       { "attr": "home", "visible": false, "enabled": false },
                                       { "attr": "login", "visible": false, "enabled": false },
                                       { "attr": "logout", "visible": false, "enabled": false },
                                       {"attr": "data-analysis", "visible": false, "enabled": false },
                                       { "attr": "sellers", "visible": false, "enabled": false },
                                       { "attr": "billed-age", "visible": false, "enabled": false },
                                       { "attr": "commissions", "visible": false, "enabled": false }]}'
    WHERE rol_name= 'user';