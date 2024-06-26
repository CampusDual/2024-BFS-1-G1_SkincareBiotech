from faker import Faker
import random
from datetime import date
from data import products
from generate_querys import generate_inserts
from probs import *
import json

users_names = []
# Crear una instancia de Faker
faker = Faker('es_ES')

# Número de usuarios a generar
num_users = 300
start_usr_id = 2000
start_ord_id = 1
start_ol_id = 1
start_visit_id = 1
visits = []

# Rango de valores para pro_id
pro_id_min = 1
pro_id_max = 50

# Probabilidades para ol_units
ol_units_prob = [0.75, 0.20, 0.03, 0.01, 0.01]

# Definir las distribuciones de edad y pesos
age_distribution_uge1 = [
    (40, 45), (45, 50), (35, 40),
    (50, 55), (20, 25), (55, 60),
    (60, 70), (18, 20), (25, 30),
    (30, 35)
]
age_weights_uge1 = [
    0.50, 0.20, 0.10,
    0.05, 0.02, 0.02,
    0.02, 0.01, 0.04,
    0.04
]

age_distribution_uge2 = [
    (45, 50), (40, 45), (50, 55),
    (35, 40), (20, 25), (55, 60),
    (60, 70), (18, 20), (25, 30),
    (30, 35)
]
age_weights_uge2 = [
    0.30, 0.20, 0.15,
    0.10, 0.05, 0.05,
    0.05, 0.02, 0.04,
    0.04
]

age_distribution_uge3_4 = [
    (18, 25), (25, 30), (30, 35), (35, 39)
]
age_weights_uge3_4 = [
    0.25, 0.25, 0.25, 0.25
]


# Probabilidades para uge_id y skin_id
uge_prob = [0.35, 0.70, 0.007, 0.003]
skin_prob = [0.9, 1.5, 1, 1.25, 2, 0.003]
order_prob = [0.25, 0.45, 0.15, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]
date_prob = {30: 0.1, 31: 0.1, 6: 0.07, 7: 0.07}

# Lista para almacenar los datos de los usuarios
users = []
# user_roles = []
# user_profiles = []
# orders = []
# order_lines = []



def get_age_distribution(uge_id):
    if uge_id == 1:
        return age_distribution_uge1, age_weights_uge1
    elif uge_id == 2:
        return age_distribution_uge2, age_weights_uge2
    else:
        return age_distribution_uge3_4, age_weights_uge3_4

def get_pro_by_pro_id(id):
    return [p for p in products if p['pro_id']==id][0]

def get_pro_user_prob(prod, prob_sex_prod, prob_cat_age, prob_cat_sex):
    pro_sex = prod['pge_id']
    pro_cat = prod['cat_id']
    return prob_sex_prod[pro_sex] * prob_cat_age[pro_cat] * prob_cat_sex[pro_cat]

def get_products_for_user(user):
    global start_ol_id,start_ord_id,start_visit_id
    pro_sex_prob = pro_sex_prob_by_user_sex[user['uge_id']]
    pro_cat_sex =  pro_cat_prob_by_sex[user['uge_id']]
    pro_cat_age = pro_cat_prob_by_age[user['min_age']]
    prob_ped_age = prob_ped_by_min_age[user['min_age']]
    prob_ped_sex = prob_ped_by_gen[user['uge_id']]
    prob_ped = prob_ped_age*prob_ped_sex


    # pa este usuario calcular a prob de que compre calquer producto
    pro_prob = {
      p['pro_id']:get_pro_user_prob(p,pro_sex_prob,pro_cat_sex,pro_cat_age)  for p in products
    }

    peds = []
    for i in range(6):
        if random.random()< prob_ped:
            start_ord_id += 1
            ped = {
                "ord_id" : start_ord_id
            }
            ped['ord_date'] = faker.date_between(start_date=date(2024, 5, 1), end_date=date(2024, 6, 27)).isoformat()
            n_lines=1
            # calcular o numero de lineas
            for i in range(3):
                if random.random() < prob_ped:
                    n_lines += 1
           
            ids_pro_lin_ped = random.choices([k for k,v in pro_prob.items()], [v for k,v in pro_prob.items()], k=n_lines)
            while len(ids_pro_lin_ped) != len(set(ids_pro_lin_ped)):
                ids_pro_lin_ped = random.choices([k for k,v in pro_prob.items()], [v for k,v in pro_prob.items()], k=n_lines)
            ped['lines']=[]
            for id in ids_pro_lin_ped:
                start_ol_id += 1
                pro = get_pro_by_pro_id(id)
                line = {
                    "ol_id": start_ol_id,
                    "ord_id": start_ord_id,
                    "pro_id": id,
                    "ol_price" : pro['real_price'],
                    "ol_units": 1,
                    "ol_sent": True,
                }
                ped ['lines'].append(line)

                start_visit_id += 1
                visits.append({"pro_id": id, "prov_id": start_visit_id, "prov_uid": start_visit_id, "prov_date": ped["ord_date"]})
                if random.random()>0.7:
                    start_visit_id += 1
                    visits.append({"pro_id": id, "prov_id": start_visit_id, "prov_uid": start_visit_id, "prov_date": ped["ord_date"]})
                if random.random()>0.95:
                    start_visit_id += 1
                    visits.append({"pro_id": id, "prov_id": start_visit_id, "prov_uid": start_visit_id, "prov_date": ped["ord_date"]})
                # Scaria que productos compra desde pro_prob

            peds.append(ped)

    return peds
        


# Generar usuarios
for i in range(num_users):
    usr_id = start_usr_id + i
    usr_login = faker.user_name()
    while usr_login in users_names:
        usr_login = faker.user_name()
    users_names.append(usr_login)
    uge_id = random.choices([1, 2, 3, 4], uge_prob)[0]
    if uge_id == 1:
        usr_name = faker.first_name_male()
    elif uge_id == 2:
        usr_name = faker.first_name_female()
    else:
        usr_name = faker.first_name()
    usr_surname = faker.last_name()
    usr_email = f"{usr_login}@example.com"
    usr_password = "$2a$12$97NEAHKTE4wWjSndPjzDd.idjbdorhdUXFwu9XMZj1RNcCXbwApju"
    usr_phone = f"{random.choice([6, 7, 8, 9])}{faker.random_number(digits=8)}"

    # Generar fecha de nacimiento asegurando que min_age <= max_age
    age_distribution, age_weights = get_age_distribution(uge_id)
    selected_age_range = random.choices(age_distribution, age_weights)[0]
    min_age, max_age = selected_age_range
    upr_birthdate = faker.date_of_birth(minimum_age=min_age, maximum_age=max_age)

    upr_address = faker.address().replace('\n', ' ')

    # Generar skin_id basado en probabilidades
    skin_id = random.choices([1, 2, 3, 4, 5, 6], skin_prob)[0]

    # Generar ord_zipcode
    ord_zipcode = faker.postcode()

    curr_user = {
        "usr_id": usr_id, "usr_login": usr_login, "usr_name": usr_name, "usr_surname": usr_surname,
        "usr_email": usr_email, "usr_password": usr_password, "usr_phone": usr_phone,
        "rol_id": 2, "upr_birthdate": upr_birthdate.isoformat(), "upr_address": upr_address,
        "uge_id": uge_id, "skin_id": skin_id, "ord_zipcode": ord_zipcode, 'min_age': min_age
        }

    curr_user["orders"]= get_products_for_user(curr_user)
    users.append(curr_user)

with open('backup.json','w') as f:
    f.write(json.dumps(users))

generate_inserts(users=users, visitsProduct=visits)
print(
    "Archivos insert_usr_user.sql, insert_usr_user_role.sql, insert_usr_profile.sql, insert_orders.sql e insert_ord_lines.sql generados con éxito.")
