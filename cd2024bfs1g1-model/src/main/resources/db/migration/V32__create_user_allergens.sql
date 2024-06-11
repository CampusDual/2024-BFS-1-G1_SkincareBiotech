CREATE TABLE public.allergens_users (
    au_id serial NOT NULL,
	aller_id int NOT NULL,
	usr_id int NOT NULL,
    CONSTRAINT allergens_users_pk PRIMARY KEY (au_id),
	CONSTRAINT allergens_users_fk_products FOREIGN KEY (aller_id) REFERENCES public.allergens(aller_id),
	CONSTRAINT allergens_users_fk_allergens FOREIGN KEY (usr_id) REFERENCES public.usr_user(usr_id)
);

ALTER TABLE public.allergens_users ADD CONSTRAINT allergens_users_unique UNIQUE (aller_id,usr_id);