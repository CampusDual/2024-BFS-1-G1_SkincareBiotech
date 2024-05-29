CREATE TABLE public.gender (
	gen_id serial NOT NULL,
	gen_name varchar NOT NULL,
	CONSTRAINT gender_pk PRIMARY KEY (gen_id)
);

INSERT INTO public.gender (gen_name) VALUES
	 ('female'),
	 ('male'),
	 ('unisex');


ALTER TABLE public.products ADD pro_gender int NOT NULL;
ALTER TABLE public.products ADD CONSTRAINT products_gender_fk FOREIGN KEY (pro_gender) REFERENCES public.gender(gen_id);
ALTER TABLE public.products ALTER COLUMN pro_gender SET DEFAULT 3;
UPDATE public.products SET pro_gender = 3 WHERE pro_gender IS NULL;