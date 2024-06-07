ALTER TABLE public.usr_profile ADD COLUMN upr_zipcode int;

ALTER TABLE public.usr_profile ALTER COLUMN upr_address DROP NOT NULL;
