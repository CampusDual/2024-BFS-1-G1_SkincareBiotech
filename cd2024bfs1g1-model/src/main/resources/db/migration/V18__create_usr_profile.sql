CREATE TABLE public.usr_profile (
	usr_id int4 NOT NULL,
	upr_birthdate date NOT NULL,
	CONSTRAINT usr_profile_pk PRIMARY KEY (usr_id),
	CONSTRAINT usr_profile_usr_user_fk FOREIGN KEY (usr_id) REFERENCES public.usr_user(usr_id)
);

CREATE TABLE public.gra_billed_age (
	gba_id serial NOT NULL,
	gba_min_age integer NOT NULL,
	gba_max_age integer NOT NULL,
	CONSTRAINT gra_billed_age_pk PRIMARY KEY (gba_id)
);

UPDATE public.usr_role
	SET rol_json_client_permission='{ "menu": [ { "attr": "products", "visible": false, "enabled": false },
	{ "attr": "orders", "visible": false, "enabled": false },{ "attr": "brands", "visible": false, "enabled": false },
	{ "attr": "categories", "visible": false, "enabled": false }, { "attr": "home", "visible": false, "enabled": false },
	{ "attr": "login", "visible": false, "enabled": false }, { "attr": "logout", "visible": false, "enabled": false },
	{ "attr": "data-analysis", "visible": false, "enabled": false }, { "attr": "billed-age", "visible": false, "enabled": false } ] }'
	WHERE rol_name= 'user';
UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false },
    { "attr": "featuredPublic", "visible": false, "enabled": false }, { "attr": "history", "visible": false, "enabled": false },
    { "attr": "login", "visible": false, "enabled": false }, { "attr": "billed-age", "visible": false, "enabled": false } ] }'
    WHERE rol_name= 'seller';
UPDATE public.usr_role
	SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false },
	{ "attr": "featuredPublic", "visible": false, "enabled": false }, { "attr": "history", "visible": false, "enabled": false },
	{ "attr": "products", "visible": false, "enabled": false }, { "attr": "categories", "visible": false, "enabled": false },
	{ "attr": "brands", "visible": false, "enabled": false }, { "attr": "orders", "visible": false, "enabled": false },
	 { "attr": "data-analysis", "visible": false, "enabled": false }, { "attr": "login", "visible": false, "enabled": false },
	 { "attr": "cart", "visible": false, "enabled": false } ] }'
	WHERE rol_name= 'admin';