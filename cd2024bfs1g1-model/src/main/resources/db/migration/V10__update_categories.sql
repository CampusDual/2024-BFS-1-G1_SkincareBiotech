INSERT INTO public.categories (cat_name)
    VALUES ('Default');

UPDATE products
    SET cat_id = (
        SELECT cat_id
        FROM categories
        WHERE cat_name = 'Default'
    )
WHERE cat_id is null;