CREATE DATABASE pern_login;

-- users table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT current_date
);