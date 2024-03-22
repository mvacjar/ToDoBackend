
CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(100) ,
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

INSERT INTO todos (id, email, title, progress, date) 
VALUES ('0', 'maria@gmail.com', 'First todo', '10', '18-03-2024');


