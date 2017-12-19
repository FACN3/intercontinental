BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  page_id TEXT NOT NULL,
  comment TEXT NOT NULL,
  comment_time TIMESTAMP
);

INSERT INTO users (username, password) VALUES
  ('Mynah', '12345678'),
  ('Neil', 'abcdefg'),
  ('Hoslack', 'abcd1234');

INSERT INTO comments (user_id, page_id, comment) VALUES
  (1, 'SA', 'South America is awesome!'),
  (2, 'SA', 'I hated South America'),
  (2, 'EU', 'I love Europe'),
  (3, 'AS', 'Labaneh is the best!');

COMMIT;
