UPDATE public.usr_role
    SET rol_json_client_permission=
        '{
           "menu": [
         { "attr": "productsPublic", "visible": false, "enabled": false },
         { "attr": "featuredPublic", "visible": false, "enabled": false },
         { "attr": "history", "visible": false, "enabled": false },
         { "attr": "login", "visible": false, "enabled": false },
         { "attr": "cart", "visible": false, "enabled": false },
         { "attr": "billed-age", "visible": false, "enabled": false },
         { "attr": "sells-by-category", "visible": false, "enabled": false },
         { "attr": "profile", "visible": false, "enabled": false },
         { "attr": "sellers", "visible": false, "enabled": false },
         { "attr": "allergens", "visible": false, "enabled": false }
         ]
         }'
    WHERE rol_name= 'seller';
UPDATE public.usr_role
    SET rol_json_client_permission=
        '{
        "menu": [
        { "attr": "products", "visible": false, "enabled": false },
        { "attr": "orders", "visible": false, "enabled": false },
        { "attr": "brands", "visible": false, "enabled": false },
        { "attr": "categories", "visible": false, "enabled": false },
        { "attr": "home", "visible": false, "enabled": false },
        { "attr": "login", "visible": false, "enabled": false },
        { "attr": "logout", "visible": false, "enabled": false },
        {"attr": "data-analysis", "visible": false, "enabled": false },
        {"attr": "sells-by-category", "visible": false, "enabled": false },
        {"attr": "billed-age", "visible": false, "enabled": false },
        { "attr": "sellers", "visible": false, "enabled": false },
        { "attr": "allergens", "visible": false, "enabled": false }
        ]
        }'
    WHERE rol_name= 'user';