CREATE TABLE IF NOT EXISTS types_of_travellers (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  age INTEGER NOT NULL, 
  gender TEXT NOT NULL,
  nationality TEXT NOT NULL,
  email TEXT NOT NULL,
  occupation TEXT NOT NULL,
  types_of_travellers TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  travel_period TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATE DEFAULT current_timestamp,
  author_id INTEGER,
  types_of_travellers TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATE DEFAULT current_timestamp,
  username TEXT NOT NULL,
  author_id INTEGER 
);