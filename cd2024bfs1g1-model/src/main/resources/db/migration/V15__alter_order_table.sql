ALTER TABLE public.orders
ADD COLUMN ord_paid boolean DEFAULT false NOT NULL;