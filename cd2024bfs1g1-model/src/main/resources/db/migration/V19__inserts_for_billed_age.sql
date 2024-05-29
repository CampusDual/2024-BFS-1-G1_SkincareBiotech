INSERT INTO usr_user (usr_login, usr_name, usr_surname, usr_email, usr_password, usr_phone) VALUES
('ana.martinez', 'Ana', 'Martinez', 'ana.martinez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
('carlos.gomez', 'Carlos', 'Gomez', 'carlos.gomez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
('lucia.hernandez', 'Lucia', 'Hernandez', 'lucia.hernandez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
('david.jimenez', 'David', 'Jimenez', 'david.jimenez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367'),
('sofia.lopez', 'Sofia', 'Lopez', 'sofia.lopez@example.com', '$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju', '640982367');

INSERT INTO usr_user_role (usr_id, rol_id)
SELECT
  last_users.usr_id,
  roles.rol_id
FROM (
    SELECT usr_id
    FROM usr_user
    ORDER BY usr_id DESC
    LIMIT 5
) AS last_users
CROSS JOIN usr_role AS roles
WHERE roles.rol_name = 'user';

INSERT INTO usr_profile (usr_id, upr_birthdate)
SELECT usr_id, CASE usr_id
    WHEN (SELECT usr_id FROM usr_user WHERE usr_login = 'ana.martinez') THEN CAST('2001-01-01' AS DATE)
    WHEN (SELECT usr_id FROM usr_user WHERE usr_login = 'carlos.gomez') THEN CAST('2003-02-01' AS DATE)
    WHEN (SELECT usr_id FROM usr_user WHERE usr_login = 'lucia.hernandez') THEN CAST('2000-03-01' AS DATE)
    WHEN (SELECT usr_id FROM usr_user WHERE usr_login = 'david.jimenez') THEN CAST('2005-04-01' AS DATE)
    WHEN (SELECT usr_id FROM usr_user WHERE usr_login = 'sofia.lopez') THEN CAST('2004-05-01' AS DATE)
    END AS birthdate
FROM (
    SELECT usr_id
    FROM usr_user
    ORDER BY usr_id DESC
    LIMIT 5
) AS last_users;

INSERT INTO orders (ord_client_id, ord_date, ord_paid, ord_sent, ord_name, ord_phone, ord_zipcode, ord_address)
SELECT
  usr_id,
  NOW(),
  TRUE,
  TRUE,
  usr_login,
  640982367,
  15000,
  'Calle ' || s.idx
FROM (
  SELECT usr_id, usr_login
  FROM usr_user
  ORDER BY usr_id DESC
  LIMIT 5
) AS last_users
CROSS JOIN generate_series(1,5) AS s(idx);

INSERT INTO ord_lines (ord_id, pro_id, ol_price, ol_units)
SELECT
    sub.ord_id,
    sub.pro_id,
    p.pro_price * sub.units AS price,
    sub.units AS units
FROM (
    SELECT ord_id,
           (FLOOR(RANDOM() * 6) + 1)::INT AS pro_id,
           (FLOOR(RANDOM() * 10) + 1)::INT AS units,
           generate_series(1, (FLOOR(RANDOM() * 5) + 1)::INT) AS product_count
    FROM orders
    ORDER BY ord_id DESC
    LIMIT 25
) AS sub
JOIN products p ON sub.pro_id = p.pro_id;