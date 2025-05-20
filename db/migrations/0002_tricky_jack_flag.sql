CREATE TABLE `journeys` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mpg` real NOT NULL,
	`price_per_litre` real NOT NULL,
	`distance_in_miles` real NOT NULL,
	`split_between` real NOT NULL,
	`price` real NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
