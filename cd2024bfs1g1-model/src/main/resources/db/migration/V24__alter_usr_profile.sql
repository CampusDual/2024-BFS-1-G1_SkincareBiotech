ALTER TABLE public.usr_profile ADD COLUMN upr_address varchar;
UPDATE public.usr_profile
SET upr_address = 'Calle 123'
WHERE upr_address IS NULL;
ALTER TABLE public.usr_profile ALTER COLUMN upr_address SET NOT NULL;
