ALTER TABLE public.products ADD pro_seller_id integer NOT NULL;
ALTER TABLE public.products ADD CONSTRAINT pro_seller_id_fk FOREIGN KEY (pro_seller_id) REFERENCES usr_user(usr_id);