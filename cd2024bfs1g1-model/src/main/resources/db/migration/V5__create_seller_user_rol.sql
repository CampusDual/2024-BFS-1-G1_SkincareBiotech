INSERT INTO public.usr_role (rol_id,rol_name,rol_xml_client_permission,rol_json_client_permission,rol_notes)
VALUES (3,'seller',
	'<?xml version="1.0" encoding="UTF-8"?><security><MENU><ELEMENT attr="admin"><Enabled restricted="yes"/><Visible restricted="yes"/></ELEMENT></MENU></security>',
	'{ "menu": [{ "attr": "admin", "visible": false, "enabled": false }]}',
	'This is the seller role');

UPDATE public.usr_role
SET rol_json_client_permission = '{ "menu": [{ "attr": "admin", "visible": false, "enabled": false },{"attr": "products", "visible": false, "enabled": false}] }'
WHERE rol_id = 2;

INSERT INTO public.usr_user (usr_id,usr_login,usr_name,usr_surname,usr_email,usr_password,usr_notes)
	VALUES (3,'seller','Seller Name','Seller Surname','selleruser@mail.com','$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju','This is the seller user');

INSERT INTO public.usr_user_role (usr_id,rol_id)
	VALUES (3,3);