ALTER TABLE public.products ADD pro_seller_id integer NOT NULL;
ALTER TABLE public.products ADD CONSTRAINT pro_seller_id_fk FOREIGN KEY (pro_seller_id) REFERENCES usr_user(usr_id);
INSERT INTO public.usr_user (usr_id,usr_login,usr_name,usr_surname,usr_email,usr_password,usr_notes)
VALUES (4,'nivea','Nivea name','Nivea surname','nviea@mail.com','$2a$12$IhTiQUV74FLLQskgkKQejO7ehrghAT.ZHXoUNB8QREoNvx/yaEZ.W','This is the nivea user');
INSERT INTO public.usr_user_role (usr_id,rol_id)
VALUES (4,3);