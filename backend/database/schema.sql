CREATE TABLE `users` (
  `id` varchar(255) PRIMARY KEY default(uuid()),
  `username` varchar(255),
  `email` varchar(255) unique not null,
  `hashed_password` text not null,
  `is_administrator` boolean not null
);

CREATE TABLE `conditions` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `description` text
);

CREATE TABLE `condition_care` (
  `condition_id` integer,
  `care_id` integer
);

CREATE TABLE `cares` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `description` text
);

CREATE TABLE `care_place` (
  `care_id` integer,
  `place_id` integer
);

CREATE TABLE `places` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `description` varchar(255),
  `city_id` integer
);

CREATE TABLE `cities` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `description` text
);

ALTER TABLE `condition_care` ADD FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`);

ALTER TABLE `condition_care` ADD FOREIGN KEY (`care_id`) REFERENCES `cares` (`id`);

ALTER TABLE `care_place` ADD FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);

ALTER TABLE `care_place` ADD FOREIGN KEY (`care_id`) REFERENCES `cares` (`id`);

ALTER TABLE `places` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`);
