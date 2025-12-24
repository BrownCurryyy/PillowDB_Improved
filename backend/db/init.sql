CREATE DATABASE IF NOT EXISTS sleep_tracker;
USE sleep_tracker;

-- USERS
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255),
  sleep_goal INT
);

-- TIPS
CREATE TABLE tips_and_tricks (
  tip_id INT PRIMARY KEY AUTO_INCREMENT,
  message TEXT
);

-- SLEEP LOGS
CREATE TABLE sleep_logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATE,
  total_sleep FLOAT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- SLEEP DEBT
CREATE TABLE sleep_debt (
  debt_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATE,
  daily_debt FLOAT,
  total_debt FLOAT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- AFFIRMATIONS
CREATE TABLE affirmations (
  aff_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  tip_id INT,
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (tip_id) REFERENCES tips_and_tricks(tip_id)
);

--TRIGGER (AUTO DEBT CALC)
DELIMITER //
CREATE TRIGGER after_sleep_insert
AFTER INSERT ON sleep_logs
FOR EACH ROW
BEGIN
  DECLARE goal INT;
  DECLARE debt FLOAT;
  DECLARE total FLOAT;

  SELECT sleep_goal INTO goal FROM users WHERE user_id = NEW.user_id;
  SET debt = GREATEST(goal - NEW.total_sleep, 0);

  SELECT IFNULL(SUM(daily_debt), 0) INTO total
  FROM sleep_debt WHERE user_id = NEW.user_id;

  INSERT INTO sleep_debt (user_id, date, daily_debt, total_debt)
  VALUES (NEW.user_id, NEW.date, debt, total + debt);
END;
//
DELIMITER ;

-- DEMO USERS
INSERT INTO users (name, email, password, sleep_goal) VALUES
('Ayaan', 'ayaan@mail.com', 'hashed123', 8),
('Riya', 'riya@mail.com', 'hashed456', 7),
('Kabir', 'kabir@mail.com', 'hashed789', 6);

INSERT INTO tips_and_tricks (message) VALUES
('Avoid screens 1 hour before sleep'),
('Drink water after waking up'),
('Keep a consistent sleep schedule'),
('No caffeine after 6 PM'),
('Dark room = better sleep');

INSERT INTO sleep_logs (user_id, date, total_sleep) VALUES
(1, '2025-09-01', 6),
(1, '2025-09-02', 7),
(1, '2025-09-03', 5),
(1, '2025-09-04', 8),
(1, '2025-09-05', 6.5),
(1, '2025-09-06', 7),
(1, '2025-09-07', 6),
(1, '2025-09-08', 8),
(1, '2025-09-09', 7.5),
(1, '2025-09-10', 6);

INSERT INTO sleep_logs (user_id, date, total_sleep) VALUES
(2, '2025-09-01', 7),
(2, '2025-09-02', 6),
(2, '2025-09-03', 5.5),
(2, '2025-09-04', 7),
(2, '2025-09-05', 6),
(2, '2025-09-06', 6.5),
(2, '2025-09-07', 7),
(2, '2025-09-08', 5),
(2, '2025-09-09', 6),
(2, '2025-09-10', 7);

INSERT INTO sleep_logs (user_id, date, total_sleep) VALUES
(3, '2025-09-01', 5),
(3, '2025-09-02', 6),
(3, '2025-09-03', 4.5),
(3, '2025-09-04', 6),
(3, '2025-09-05', 5.5),
(3, '2025-09-06', 6),
(3, '2025-09-07', 5),
(3, '2025-09-08', 6),
(3, '2025-09-09', 5.5),
(3, '2025-09-10', 6);

INSERT INTO affirmations (user_id, tip_id, date) VALUES
(1, 1, '2025-09-03'),
(1, 3, '2025-09-05'),
(2, 2, '2025-09-04'),
(2, 4, '2025-09-06'),
(3, 5, '2025-09-07');


--join example
SELECT u.name, s.date, s.total_sleep, d.daily_debt, d.total_debt
FROM users u
JOIN sleep_logs s ON u.user_id = s.user_id
JOIN sleep_debt d ON s.user_id = d.user_id AND s.date = d.date;

