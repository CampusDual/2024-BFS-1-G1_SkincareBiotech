TRUNCATE TABLE public.orders;
ALTER TABLE public.orders ADD ord_client_id int4 NOT NULL;
ALTER TABLE public.orders ADD CONSTRAINT orders_usr_user_fk FOREIGN KEY (ord_client_id) REFERENCES public.usr_user(usr_id);

UPDATE public.usr_role
	SET rol_json_client_permission='{ "menu": [ { "attr": "products", "visible": false, "enabled": false }, { "attr": "orders", "visible": false, "enabled": false }, { "attr": "categories", "visible": false, "enabled": false }, { "attr": "home", "visible": false, "enabled": false }, { "attr": "login", "visible": false, "enabled": false }, { "attr": "logout", "visible": false, "enabled": false } ] }'
	WHERE rol_name= 'user';
UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false }, { "attr": "featuredPublic", "visible": false, "enabled": false }, { "attr": "history", "visible": false, "enabled": false }, { "attr": "login", "visible": false, "enabled": false } ] }'
    WHERE rol_name= 'seller';