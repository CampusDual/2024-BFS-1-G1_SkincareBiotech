CREATE TABLE public.usr_gender (
	uge_id serial NOT NULL,
	uge_name varchar NOT NULL,
	CONSTRAINT genre_pk PRIMARY KEY (uge_id),
	CONSTRAINT genre_unique UNIQUE (uge_name)
);

INSERT INTO public.usr_gender (uge_name) VALUES
	 ('MAN'),
	 ('WOMAN'),
	 ('OTHER'),
	 ('I WOULD RATHER NOT ANSWER');

ALTER TABLE public.usr_profile ADD uge_id int NULL;

UPDATE public.usr_profile
SET uge_id = (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'I WOULD RATHER NOT ANSWER')
WHERE uge_id IS NULL;

ALTER TABLE public.usr_profile ALTER COLUMN uge_id SET NOT NULL;

ALTER TABLE public.usr_profile ADD CONSTRAINT usr_profile_usr_gender_fk FOREIGN KEY (uge_id) REFERENCES public.usr_gender(uge_id);