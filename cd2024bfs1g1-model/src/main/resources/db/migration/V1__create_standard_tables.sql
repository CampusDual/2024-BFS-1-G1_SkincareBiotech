CREATE TABLE usr_user (
	usr_id serial NOT NULL,
	usr_login varchar(50) NOT NULL,
	usr_name varchar(50) NULL,
	usr_surname varchar(100) NULL,
	usr_email varchar(250) NULL,
	usr_password varchar(60) NOT NULL,
	usr_notes text NULL,
	usr_phone varchar(50) NULL,
	usr_creation_date timestamp NULL DEFAULT now(),
	usr_down_date timestamp NULL,
	usr_photo varchar NULL,
	CONSTRAINT usr_user_pk PRIMARY KEY (usr_id),
	CONSTRAINT usr_user_un UNIQUE (usr_login)
);

CREATE TABLE usr_role (
	rol_id serial NOT NULL,
	rol_name varchar(100) NOT NULL,
	rol_xml_client_permission text NOT NULL DEFAULT '<?xml version="1.0" encoding="UTF-8"?><security></security>',
	rol_json_client_permission text,
	rol_notes text NULL,
	CONSTRAINT usr_role_pk PRIMARY KEY (rol_id),
	CONSTRAINT usr_role_un UNIQUE (rol_name)
);

CREATE TABLE usr_user_role (
	uro_id serial NOT NULL,
	usr_id int4 NOT NULL,
	rol_id int4 NOT NULL,
	CONSTRAINT usr_user_role_pk PRIMARY KEY (uro_id)
);
ALTER TABLE usr_user_role ADD CONSTRAINT usr_user_role_fk FOREIGN KEY (usr_id) REFERENCES usr_user(usr_id);
ALTER TABLE usr_user_role ADD CONSTRAINT usr_user_role_fk_1 FOREIGN KEY (rol_id) REFERENCES usr_role(rol_id);

CREATE TABLE usr_server_permission (
	srp_id serial NOT NULL,
	srp_name varchar(400) NOT NULL,
	CONSTRAINT usr_server_permission_pk PRIMARY KEY (srp_id),
	CONSTRAINT usr_server_permission_un UNIQUE (srp_name)
);

CREATE TABLE usr_role_server_permission (
	rsp_id serial NOT NULL,
	rol_id int4 NOT NULL,
	srp_id int4 NOT NULL,
	CONSTRAINT usr_role_server_permiss_pk PRIMARY KEY (rsp_id)
);
ALTER TABLE usr_role_server_permission ADD CONSTRAINT usr_role_server_permiss_fk FOREIGN KEY (rol_id) REFERENCES usr_role(rol_id);
ALTER TABLE usr_role_server_permission ADD CONSTRAINT usr_role_server_permiss_fk_1 FOREIGN KEY (srp_id) REFERENCES usr_server_permission(srp_id);

INSERT INTO usr_user (usr_id, usr_login, usr_name, usr_surname, usr_email, usr_password, usr_notes, usr_phone, usr_creation_date, usr_down_date, usr_photo)
	VALUES(1, 'admin', 'Admin Name', 'Admin Surname', 'adminuser@mail.com', '$2a$12$QO55iJTpgNtTj5J2DEcAbegoJpFe6L8DewoZIJA0RDeh9HSK8mOu.', 'This is the administrator user', NULL, NOW(), NULL, NULL);
INSERT INTO usr_user (usr_id, usr_login, usr_name, usr_surname, usr_email, usr_password, usr_notes, usr_phone, usr_creation_date, usr_down_date, usr_photo)
	VALUES(2, 'demo', 'Demo Name', 'Demo Surname', 'demouser@mail.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', 'This is the demo user', NULL, NOW(), NULL, NULL);
ALTER SEQUENCE usr_user_usr_id_seq RESTART WITH 3;

INSERT INTO usr_role (rol_id, rol_name, rol_xml_client_permission, rol_json_client_permission, rol_notes) VALUES(1, 'admin', '<?xml version="1.0" encoding="UTF-8"?><security><MENU><ELEMENT attr="admin"><Enabled restricted="yes"/><Visible restricted="yes"/></ELEMENT></MENU></security>', NULL, 'This is the administrator role');
INSERT INTO usr_role (rol_id, rol_name, rol_xml_client_permission, rol_json_client_permission, rol_notes) VALUES(2, 'user', '<?xml version="1.0" encoding="UTF-8"?><security><MENU><ELEMENT attr="admin"><Enabled restricted="yes"/><Visible restricted="yes"/></ELEMENT></MENU></security>', '{ "menu": [{ "attr": "admin", "visible": false, "enabled": false }] }', 'This is the user role');
ALTER SEQUENCE usr_role_rol_id_seq RESTART WITH 3;

INSERT INTO usr_user_role (uro_id, usr_id, rol_id) VALUES(1, 1, 1);
INSERT INTO usr_user_role (uro_id, usr_id, rol_id) VALUES(2, 2, 2);
ALTER SEQUENCE usr_user_role_uro_id_seq RESTART WITH 3;

INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/userQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/userPaginationQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/userInsert');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/userUpdate');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/userDelete');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/roleQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/rolePaginationQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/roleInsert');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/roleUpdate');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/roleDelete');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/serverRoleQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/serverRolePaginationQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/serverRoleUpdate');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/rolesForUserQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/rolesForUserPaginationQuery');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService/rolesForUserUpdate');

INSERT INTO usr_role_server_permission(rol_id, srp_id) SELECT 1, srp_id FROM usr_server_permission;
