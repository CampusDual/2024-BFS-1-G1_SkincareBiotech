def generate_inserts(users, visitsProduct, resetIndex=50000):
    # Crear el archivo SQL para usr_user
    with open('data.sql', 'w', encoding='utf-8') as f:
        f.write("ALTER SEQUENCE public.usr_user_role_uro_id_seq	RESTART 1000;\n")
        f.write(
            "INSERT INTO usr_user (usr_id, usr_login, usr_name, usr_surname, usr_email, usr_password, usr_phone) VALUES\n")
        usr_user_lines = []
        for i, user in enumerate(users):
            usr_user_lines.append(f"({user['usr_id']}, '{user['usr_login']}', '{user['usr_name']}', '{user['usr_surname']}', '{user['usr_email']}', '{user['usr_password']}', '{user['usr_phone']}')")

        f.write(
            ',\n'.join(usr_user_lines) + ';'
        )
        f.write("\n\n\n\n\n")

    # Crear el archivo SQL para usr_user_role
    #with open('data.sql', 'a', encoding='utf-8') as f:
        
        usr_user_role_lines = []
        f.write(f"INSERT INTO usr_user_role (usr_id, rol_id) VALUES\n")
        for user in users:
            usr_user_role_lines.append(f"({user['usr_id']}, 2)")

        f.write(
            ',\n'.join(usr_user_role_lines) + ';'
        )            
        f.write("\n\n\n\n\n")

    # Crear el archivo SQL para usr_profile
    #with open('data.sql', 'a', encoding='utf-8') as f:
        
        usr_profile_lines = []
        f.write(f"INSERT INTO usr_profile (usr_id, upr_birthdate, upr_address, uge_id, skin_id) VALUES\n")
        for user in users:
            usr_profile_lines.append(f"({user['usr_id']}, '{user['upr_birthdate']}', '{user['upr_address']}', {user['uge_id']}, {user['skin_id']})")
        
        f.write(
            ',\n'.join(usr_profile_lines) + ';'
        ) 
        f.write("\n\n\n\n\n")

    # Crear el archivo SQL para orders
    #with open('data.sql', 'a', encoding='utf-8') as f:
        
        orders_lines = []
        f.write(f"INSERT INTO orders (ord_id, ord_name, ord_phone, ord_zipcode, ord_address, ord_client_id, ord_date, ord_paid) VALUES\n")
        for user in users:
            for order in user['orders']:
                orders_lines.append(f"({order['ord_id']}, '{user['usr_name']}', '{user['usr_phone']}', '{user['ord_zipcode']}', '{user['upr_address']}', {user['usr_id']}, '{order['ord_date']}', true)")
        
        f.write(
            ',\n'.join(orders_lines) + ';'
        ) 
        f.write("\n\n\n\n\n")

    # Crear el archivo SQL para ord_lines
    #with open('data.sql', 'a', encoding='utf-8') as f:
        
        ord_lines_lines = []
        f.write(f"INSERT INTO ord_lines (ol_id, ord_id, pro_id, ol_price, ol_units, ol_sent) VALUES\n")
        for user in users:
            for order in user['orders']:
                for line in order['lines']:
                    ord_lines_lines.append(f"({line['ol_id']}, {order['ord_id']}, {line['pro_id']}, {line['ol_price']:.2f}, {line['ol_units']}, {line['ol_sent']})")
        
        f.write(
            ',\n'.join(ord_lines_lines) + ';'
        )
        f.write("\n\n\n\n\n")

        products_view_lines = []
        f.write(f"INSERT INTO products_view (prov_id, prov_uid, pro_id, prov_date) VALUES\n")
        for visit in visitsProduct:
            products_view_lines.append(f"({visit['prov_id']}, {visit['prov_uid']}, {visit['pro_id']}, '{visit['prov_date']}')")
        
        f.write(
            ',\n'.join(products_view_lines) + ';'
        )
        f.write("\n\n\n\n\n")

        secuencias = ["allergens_aller_id_seq",
                    "allergens_products_ap_id_seq",
                    "allergens_users_au_id_seq",
                    "brands_bra_id_seq",
                    "categories_cat_id_seq",
                    "commissions_com_id_seq",
                    "gra_billed_age_gba_id_seq",
                    "ord_lines_ol_id_seq",
                    "orders_ord_id_seq",
                    "pro_gender_pge_id_seq",
                    "product_skin_ps_id_seq",
                    "products_pro_id_seq",
                    "products_view_prov_id_seq",
                    "sales_sal_id_seq",
                    "skin_types_skin_id_seq",
                    "usr_gender_uge_id_seq",
                    "usr_role_rol_id_seq",
                    "usr_role_server_permission_rsp_id_seq",
                    "usr_server_permission_srp_id_seq",
                    "usr_user_role_uro_id_seq",
                    "usr_user_usr_id_seq",]
        for seq in secuencias:
            f.write(f"ALTER SEQUENCE public.{seq} RESTART {resetIndex};\n")
