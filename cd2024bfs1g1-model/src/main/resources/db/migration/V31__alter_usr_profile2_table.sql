ALTER TABLE public.usr_profile ADD COLUMN upr_zipcode int;
UPDATE public.usr_profile
SET upr_zipcode = 11111
WHERE upr_zipcode IS NULL;
ALTER TABLE public.usr_profile ALTER COLUMN upr_zipcode SET NOT NULL;