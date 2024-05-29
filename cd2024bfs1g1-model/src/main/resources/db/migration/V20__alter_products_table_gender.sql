CREATE TABLE public.pro_gender (
	pge_id serial NOT NULL,
	pge_name varchar NOT NULL,
	CONSTRAINT pro_gender_pk PRIMARY KEY (pge_id)
);

INSERT INTO public.pro_gender (pge_name) VALUES
	 ('FEMALE'),
	 ('MALE'),
	 ('UNISEX');

ALTER TABLE public.products ADD pge_id int;
UPDATE public.products SET pge_id = 3 WHERE pge_id IS NULL;
ALTER TABLE public.products ADD CONSTRAINT products_gender_fk FOREIGN KEY (pge_id) REFERENCES public.pro_gender(pge_id);
ALTER TABLE public.products ALTER COLUMN pge_id SET NOT NULL;

