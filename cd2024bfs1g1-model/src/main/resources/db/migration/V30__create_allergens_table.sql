CREATE TABLE public.allergens (
	aller_id serial NOT NULL,
	aller_name varchar NOT NULL,
	CONSTRAINT allergens_pk PRIMARY KEY (aller_id),
	CONSTRAINT allergens_unique_name UNIQUE (aller_name)
);

CREATE TABLE public.allergens_products (
	pro_id int NOT NULL,
	aller_id int NOT NULL,
	CONSTRAINT allergens_products_products_fk_products FOREIGN KEY (pro_id) REFERENCES public.products(pro_id),
	CONSTRAINT allergens_products_products_fk_allergens FOREIGN KEY (aller_id) REFERENCES public.allergens(aller_id)
);

ALTER TABLE public.allergens_products ADD ap_id serial NOT NULL;
ALTER TABLE public.allergens_products ADD CONSTRAINT allergens_products_pk PRIMARY KEY (ap_id);

INSERT INTO allergens (aller_name) VALUES('Amylcinnamaldehyde'), ('Benzyl Alcohol'), ('Benzyl Benzoate'), ('Benzyl Salicylate'), ('Cinnamyl Alcohol'), ('Cinnamal'), ('Citral'), ('Citronellol'), ('Coumarin'), ('Eugenol'), ('Farnesol'), ('Geraniol'), ('Hexyl Cinnamal'), ('Hydroxycitronellal'), ('Isoeugenol'), ('Limonene'), ('Linalool'), ('Butylphenyl Methylpropional (Lilial)'), ('Evernia Furfuracea Extract'), ('Evernia Prunastri Extract'), ('Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde (Lyral)'), ('Methyl 2-Octynoate'), ('Alpha-Isomethyl Ionone'), ('Anisyl Alcohol'), ('Benzyl Cinnamate'), ('Citronellal'), ('Isoamyl Alcohol'), ('Isoamyl Acetate'), ('Cinnamyl Acetate'), ('Amylcinnamyl Alcohol'), ('Anisyl Acetate'), ('Benzyl Acetate'), ('Isoamyl Cinnamate'), ('Methyl Salicylate'), ('Methyl Eugenol');
CREATE UNIQUE INDEX allergens_products_pro_id_idx ON public.allergens_products (pro_id,aller_id);