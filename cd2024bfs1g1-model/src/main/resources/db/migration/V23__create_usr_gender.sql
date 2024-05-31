CREATE TABLE IF NOT EXISTS public.usr_gender (
    uge_id serial PRIMARY KEY,
    uge_name varchar NOT NULL UNIQUE
);

INSERT INTO public.usr_gender (uge_name) VALUES
    ('MAN'),
    ('WOMAN'),
    ('OTHER'),
    ('RATHER_NOT_ANSWER')
ON CONFLICT (uge_name) DO NOTHING;

ALTER TABLE public.usr_profile ADD COLUMN IF NOT EXISTS uge_id int;

UPDATE public.usr_profile
SET uge_id = (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'RATHER_NOT_ANSWER')
WHERE uge_id IS NULL;

ALTER TABLE public.usr_profile ALTER COLUMN uge_id SET NOT NULL;

ALTER TABLE public.usr_profile ADD CONSTRAINT usr_profile_usr_gender_fk FOREIGN KEY (uge_id)
REFERENCES public.usr_gender(uge_id);

UPDATE public.usr_role
    SET rol_json_client_permission = '{ "menu": [
    { "attr": "productsPublic", "visible": false, "enabled": false },
    { "attr": "featuredPublic", "visible": false, "enabled": false },
    { "attr": "history", "visible": false, "enabled": false },
    { "attr": "login", "visible": false, "enabled": false },
    { "attr": "cart", "visible": false, "enabled": false },
    { "attr": "billed-age", "visible": false, "enabled": false },
    { "attr": "sellers", "visible": false, "enabled": false }
    ] }'
WHERE rol_name = 'seller';

WITH new_users AS (
    INSERT INTO usr_user (usr_login, usr_name, usr_surname, usr_email, usr_password, usr_phone) VALUES
    ('juan.perez', 'Juan', 'Perez', 'juan.perez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('maria.garcia', 'Maria', 'Garcia', 'maria.garcia@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('luis.lopez', 'Luis', 'Lopez', 'luis.lopez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('carmen.gomez', 'Carmen', 'Gomez', 'carmen.gomez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('miguel.martinez', 'Miguel', 'Martinez', 'miguel.martinez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('ana.ruiz', 'Ana', 'Ruiz', 'ana.ruiz@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('pedro.fernandez', 'Pedro', 'Fernandez', 'pedro.fernandez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('laura.ramos', 'Laura', 'Ramos', 'laura.ramos@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('antonio.sanchez', 'Antonio', 'Sanchez', 'antonio.sanchez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('elena.diaz', 'Elena', 'Diaz', 'elena.diaz@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('jorge.morales', 'Jorge', 'Morales', 'jorge.morales@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
    ('marta.ortega', 'Marta', 'Ortega', 'marta.ortega@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367')
    RETURNING usr_id, usr_login
),
user_genders AS (
    SELECT
        usr_id,
        CASE
            WHEN usr_login = 'juan.perez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'MAN')
            WHEN usr_login = 'maria.garcia' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'WOMAN')
            WHEN usr_login = 'luis.lopez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'OTHER')
            WHEN usr_login = 'carmen.gomez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'RATHER_NOT_ANSWER')
            WHEN usr_login = 'miguel.martinez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'MAN')
            WHEN usr_login = 'ana.ruiz' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'WOMAN')
            WHEN usr_login = 'pedro.fernandez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'OTHER')
            WHEN usr_login = 'laura.ramos' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'RATHER_NOT_ANSWER')
            WHEN usr_login = 'antonio.sanchez' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'MAN')
            WHEN usr_login = 'elena.diaz' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'WOMAN')
            WHEN usr_login = 'jorge.morales' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'OTHER')
            WHEN usr_login = 'marta.ortega' THEN (SELECT uge_id FROM public.usr_gender WHERE uge_name = 'RATHER_NOT_ANSWER')
        END AS uge_id,
        CASE
            WHEN usr_login IN ('juan.perez', 'maria.garcia', 'luis.lopez', 'carmen.gomez') THEN CAST('2006-01-01' AS DATE)
            WHEN usr_login IN ('miguel.martinez', 'ana.ruiz', 'pedro.fernandez', 'laura.ramos') THEN CAST('1994-01-01' AS DATE)
            WHEN usr_login IN ('antonio.sanchez', 'elena.diaz', 'jorge.morales', 'marta.ortega') THEN CAST('1959-01-01' AS DATE)
        END AS upr_birthdate
    FROM new_users
)
INSERT INTO usr_profile (usr_id, upr_birthdate, uge_id)
SELECT usr_id, upr_birthdate, uge_id
FROM user_genders;

INSERT INTO usr_user_role (usr_id, rol_id)
SELECT usr_id, roles.rol_id
FROM usr_user
JOIN usr_role AS roles ON roles.rol_name = 'user'
WHERE usr_login IN ('juan.perez', 'maria.garcia', 'luis.lopez', 'carmen.gomez', 'miguel.martinez', 'ana.ruiz', 'pedro.fernandez', 'laura.ramos', 'antonio.sanchez', 'elena.diaz', 'jorge.morales', 'marta.ortega');

INSERT INTO orders (ord_client_id, ord_date, ord_paid, ord_name, ord_phone, ord_zipcode, ord_address)
SELECT
  usr_id,
  NOW(),
  TRUE,
  usr_login,
  640982367,
  15000,
  'Calle ' || s.idx
FROM usr_user
CROSS JOIN generate_series(1,12) AS s(idx)
WHERE usr_login IN ('juan.perez', 'maria.garcia', 'luis.lopez', 'carmen.gomez', 'miguel.martinez', 'ana.ruiz', 'pedro.fernandez', 'laura.ramos', 'antonio.sanchez', 'elena.diaz', 'jorge.morales', 'marta.ortega');

INSERT INTO ord_lines (ord_id, pro_id, ol_price, ol_units)
SELECT
    sub.ord_id,
    sub.pro_id,
    p.pro_price * sub.units AS price,
    sub.units AS units
FROM (
    SELECT ord_id,
           (FLOOR(RANDOM() * 6) + 1)::INT AS pro_id,
           (FLOOR(RANDOM() * 2) + 1)::INT AS units,
           generate_series(1, (FLOOR(RANDOM() * 5) + 1)::INT) AS product_count
    FROM orders
    ORDER BY ord_id DESC
    LIMIT 25
) AS sub
JOIN products p ON sub.pro_id = p.pro_id;

INSERT INTO public.gra_billed_age (gba_min_age,gba_max_age) VALUES
	 (30,30),
	 (18,18),
	 (65,65);