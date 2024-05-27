CREATE TABLE public.usr_profile (
    usr_id int4 NOT NULL,
    upr_birthdate date NOT NULL,
    upr_address varchar (250) NOT NULL,
    CONSTRAINT usr_profile_pk PRIMARY KEY (usr_id),
    CONSTRAINT usr_profile_usr_user_fk FOREIGN KEY (usr_id) REFERENCES public.usr_user(usr_id)
);
