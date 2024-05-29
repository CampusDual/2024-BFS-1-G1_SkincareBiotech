ALTER TABLE public.ord_lines
ALTER COLUMN ol_price TYPE
numeric USING ol_price::numeric;