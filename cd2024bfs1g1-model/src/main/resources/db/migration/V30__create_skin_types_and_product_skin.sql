CREATE TABLE public.skin_types (
   skin_id serial NOT NULL,
    skin_name varchar  NOT NULL,
    CONSTRAINT skin_types_pk PRIMARY KEY (skin_id)
);


CREATE TABLE public.product_skin (
    ps_id SERIAL NOT NULL,
    skin_id INT NOT NULL,
    pro_id INT NOT NULL,
    CONSTRAINT product_skin_pk PRIMARY KEY (ps_id),
    CONSTRAINT fk_skin_id FOREIGN KEY (skin_id) REFERENCES public.skin_types(skin_id),
    CONSTRAINT fk_pro_id FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);

UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "products", "visible": false, "enabled": false },
    { "attr": "orders", "visible": false, "enabled": false },
    { "attr": "brands", "visible": false, "enabled": false },
    { "attr": "categories", "visible": false, "enabled": false },
    { "attr": "home", "visible": false, "enabled": false },
    { "attr": "login", "visible": false, "enabled": false },
    { "attr": "logout", "visible": false, "enabled": false },
    {"attr": "data-analysis", "visible": false, "enabled": false },
    {"attr": "skin-types", "visible": false, "enabled": false },
    { "attr": "sellers", "visible": false, "enabled": false },
    {"attr": "sells-by-category", "visible": false, "enabled": false },
    {"attr": "billed-age", "visible": false, "enabled": false }]}'
    WHERE rol_name='user';
UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [ { "attr": "productsPublic", "visible": false, "enabled": false },
     { "attr": "featuredPublic", "visible": false, "enabled": false },
     { "attr": "history", "visible": false, "enabled": false },
     { "attr": "login", "visible": false, "enabled": false },
     { "attr": "cart", "visible": false, "enabled": false },
     {"attr": "skin-types", "visible": false, "enabled": false },
     { "attr": "billed-age", "visible": false, "enabled": false },
     { "attr": "sellers", "visible": false, "enabled": false },
     { "attr": "sells-by-category", "visible": false, "enabled": false } ] }'
    WHERE rol_name='seller';