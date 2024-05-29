CREATE TABLE public.skin_types (
   skin_id serial NOT NULL,
	skin_name varchar  NOT NULL,
	CONSTRAINT skin_types_pk PRIMARY KEY (skin_id)
);

ALTER TABLE public.products ADD skin_id int NULL;

ALTER TABLE public.products ADD CONSTRAINT products_skin_types_fk
FOREIGN KEY (skin_id) REFERENCES public.skin_types(skin_id);


UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "products", "visible": false, "enabled": false },
    { "attr": "orders", "visible": false, "enabled": false },
    { "attr": "brands", "visible": false, "enabled": false },
    { "attr": "categories", "visible": false, "enabled": false },
    { "attr": "home", "visible": false, "enabled": false },
    { "attr": "login", "visible": false, "enabled": false },
    { "attr": "logout", "visible": false, "enabled": false },
    {"attr": "data-analysis", "visible": false, "enabled": false },
	{"attr": "skin-types", "visible": false, "enabled": false }]}'
    WHERE rol_name= 'user';


UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false },
{ "attr": "featuredPublic", "visible": false, "enabled": false },
{ "attr": "history", "visible": false, "enabled": false },
{ "attr": "login", "visible": false, "enabled": false },
{"attr": "data-analysis", "visible": false, "enabled": false },
{"attr": "skin-types", "visible": false, "enabled": false },
{ "attr": "cart", "visible": false, "enabled": false } ] }'
    WHERE rol_name= 'seller';

