TRUNCATE TABLE public.orders;
ALTER TABLE public.orders ADD usr_id int4 NOT NULL;
ALTER TABLE public.orders ADD CONSTRAINT orders_usr_user_fk FOREIGN KEY (usr_id) REFERENCES public.usr_user(usr_id);