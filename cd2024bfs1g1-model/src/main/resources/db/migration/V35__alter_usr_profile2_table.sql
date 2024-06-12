ALTER TABLE public.usr_profile ADD COLUMN upr_zipcode varchar;

ALTER TABLE public.usr_profile ALTER COLUMN upr_address DROP NOT NULL;

ALTER TABLE public.orders ALTER COLUMN ord_phone TYPE varchar USING ord_phone::varchar;
