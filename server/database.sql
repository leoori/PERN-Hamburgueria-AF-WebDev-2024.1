CREATE DATABASE pern_hamburgueria;

-- burgers table
CREATE TABLE burgers(
    burger_id SERIAL PRIMARY KEY,
    burger_name VARCHAR(255) NOT NULL,
    burger_ingredients VARCHAR(255),
    burger_price NUMERIC(10, 2),
    burger_supply INTEGER
);

-- users table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT current_date,
    favorite_burger_id INTEGER REFERENCES burgers(burger_id)
);

--alter burger table
ALTER TABLE burgers
ADD COLUMN created_by INTEGER REFERENCES users(user_id);

--alter burger table
ALTER TABLE burgers
ADD COLUMN created_by_name VARCHAR(255);

--alter table burger
alter table burgers add column created_by_phone varchar(15);

--alter table users
alter table users add column phone varchar(15);