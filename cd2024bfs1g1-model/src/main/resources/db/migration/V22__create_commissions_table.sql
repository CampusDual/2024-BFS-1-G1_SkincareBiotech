CREATE TABLE public.commissions (
	com_id serial4 NOT NULL,
	com_name varchar NOT NULL,
	com_value int4 NOT NULL,
	CONSTRAINT commissions_pk PRIMARY KEY (com_id)
);