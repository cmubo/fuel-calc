CREATE TABLE `fuel_prices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`is_default` real DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now', 'localtime')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now', 'localtime')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `journeys` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`mpg` real NOT NULL,
	`price_per_litre` real NOT NULL,
	`distance_in_miles` real NOT NULL,
	`split_between` real NOT NULL,
	`price` real NOT NULL,
	`created_at` text DEFAULT (datetime('now', 'localtime')) NOT NULL,
	`date_of_journey` text DEFAULT (date('now', 'localtime')) NOT NULL
);
