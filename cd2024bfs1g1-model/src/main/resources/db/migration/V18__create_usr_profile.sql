CREATE TABLE public.usr_profile (
    upr_id serial NOT NULL,
    usr_id integer NOT NULL,
    upr_birthdate date NOT NULL,
    upr_address varchar(250) NOT NULL,
    CONSTRAINT usr_profile_pk PRIMARY KEY (upr_id),
    CONSTRAINT usr_profile_usr_user_fk FOREIGN KEY (usr_id) REFERENCES public.usr_user(usr_id)
);