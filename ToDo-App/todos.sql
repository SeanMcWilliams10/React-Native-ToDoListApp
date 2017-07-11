DROP DATABASE IF EXISTS todoappdb;
CREATE DATABASE todoappdb;

\c todoappdb;

CREATE TABLE todoLists (
    listID SERIAL PRIMARY KEY,
    listObj VARCHAR
);
