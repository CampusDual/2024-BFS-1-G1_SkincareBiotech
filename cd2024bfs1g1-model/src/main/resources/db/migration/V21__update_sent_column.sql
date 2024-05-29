ALTER TABLE public.ord_lines ADD ol_sent boolean DEFAULT false NOT NULL;

UPDATE ord_lines
SET ol_sent = (
	SELECT ord_sent
	FROM orders
	WHERE orders.ord_id  = ord_lines.ord_id);

ALTER TABLE orders DROP COLUMN ord_sent;