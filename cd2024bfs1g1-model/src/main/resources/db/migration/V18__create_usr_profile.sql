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
