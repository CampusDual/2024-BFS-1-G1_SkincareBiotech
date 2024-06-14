UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [
    { "attr": "products", "visible": false, "enabled": false },
    { "attr": "orders", "visible": false, "enabled": false },
    { "attr": "brands", "visible": false, "enabled": false },
    { "attr": "categories", "visible": false, "enabled": false },
    { "attr": "home", "visible": false, "enabled": false },
    { "attr": "login", "visible": false, "enabled": false },
    { "attr": "logout", "visible": false, "enabled": false },
    { "attr": "data-analysis", "visible": false, "enabled": false },
    { "attr": "skin-types", "visible": false, "enabled": false },
    { "attr": "sellers", "visible": false, "enabled": false },
    { "attr": "sells-by-category", "visible": false, "enabled": false },
    { "attr": "allergens", "visible": false, "enabled": false },
    { "attr": "billed-age", "visible": false, "enabled": false },
    { "attr": "users-skin-types", "visible": false, "enabled": false },
    { "attr": "customer-analysis", "visible": false, "enabled": false},
    { "attr": "age-range-configuration", "visible": false, "enabled": false},
    { "attr": "commissions", "visible": false, "enabled": false}]}'
    WHERE rol_name='user';
UPDATE public.usr_role
    SET rol_json_client_permission='{ "menu": [
     { "attr": "home", "visible": false, "enabled": false },
     { "attr": "productsPublic", "visible": false, "enabled": false },
     { "attr": "featuredPublic", "visible": false, "enabled": false },
     { "attr": "history", "visible": false, "enabled": false },
     { "attr": "login", "visible": false, "enabled": false },
     { "attr": "cart", "visible": false, "enabled": false },
     { "attr": "skin-types", "visible": false, "enabled": false },
     { "attr": "billed-age", "visible": false, "enabled": false },
     { "attr": "sellers", "visible": false, "enabled": false },
     { "attr": "profile", "visible": false, "enabled": false },
     { "attr": "allergens", "visible": false, "enabled": false },
     { "attr": "sells-by-category", "visible": false, "enabled": false },
     { "attr": "users-skin-types", "visible": false, "enabled": false },
     { "attr": "customer-analysis", "visible": false, "enabled": false },
     { "attr": "age-range-configuration", "visible": false, "enabled": false},
     { "attr": "commissions", "visible": false, "enabled": false}]}'
    WHERE rol_name='seller';
    update public.usr_role
    	set rol_json_client_permission = '{ "menu": [
    	{ "attr": "products", "visible": false, "enabled": false },
    	{ "attr": "orders", "visible": false, "enabled": false },
    	{ "attr": "brands", "visible": false, "enabled": false },
    	{ "attr": "categories", "visible": false, "enabled": false },
    	{ "attr": "home", "visible": false, "enabled": false },
    	{ "attr": "login", "visible": false, "enabled": false },
    	{ "attr": "cart", "visible": false, "enabled": false },
    	{ "attr": "data-analysis", "visible": false, "enabled": false },
    	{ "attr": "history", "visible": false, "enabled": false },
    	{ "attr": "productsPublic", "visible": false, "enabled": false },
    	{ "attr": "featuredPublic", "visible": false, "enabled": false },
    	{ "attr": "profile", "visible": false, "enabled": false }] }'
    	where rol_name='admin';