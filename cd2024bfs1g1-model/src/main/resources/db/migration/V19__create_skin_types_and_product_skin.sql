CREATE TABLE public.skin_types (
   skin_id serial NOT NULL,
	skin_name varchar  NOT NULL,
	CONSTRAINT skin_types_pk PRIMARY KEY (skin_id)
);


CREATE TABLE public.product_skin (
    ps_id SERIAL NOT NULL,
    skin_id INT NOT NULL,
    pro_id INT NOT NULL,
    CONSTRAINT product_skin_pk PRIMARY KEY (ps_id),
    CONSTRAINT fk_skin_id FOREIGN KEY (skin_id) REFERENCES public.skin_types(skin_id),
    CONSTRAINT fk_pro_id FOREIGN KEY (pro_id) REFERENCES public.products(pro_id)
);
