CREATE TABLE public.brands (bra_id serial NOT NULL,
                                bra_name varchar UNIQUE NOT NULL,
                                CONSTRAINT brands_pk PRIMARY KEY (bra_id));
ALTER TABLE public.products ADD bra_id int NULL;
ALTER TABLE public.products ADD CONSTRAINT products_brands_fk FOREIGN KEY (bra_id) REFERENCES public.brands(bra_id);
INSERT INTO public.brands (bra_id, bra_name) VALUES(1, 'Default');
UPDATE public.products SET bra_id = 1 WHERE bra_id IS NULL;
ALTER TABLE public.products ALTER COLUMN bra_id SET NOT NULL;