<?php

namespace App\theme;

use App\config\Planconfig;
use App\Models\Plans;

class Database
{
    //wp database
    public static function db()
    {
        global $wpdb;
        return $wpdb;
    }

    //wp database prefix
    public static function prefix()
    {
        return self::db()->prefix;
    }

    //wp database collate
    public static function collate()
    {
        return self::db()->collate;
    }

    //create plan table
    public static function plan_table()
    {

        $table = self::prefix() . "app_plans";

        $sql = "CREATE TABLE `$table` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `uid` char(36) DEFAULT NULL,
            `user_id` varchar(255) DEFAULT NULL,
            `name` varchar(255) NOT NULL,
            `slug` varchar(255) DEFAULT NULL,
            `words` int(11) NOT NULL,
            `image` int(11) NOT NULL,
            `description` text DEFAULT NULL,
            `price` int(11) NOT NULL,
            `billing_cycle` varchar(255) NOT NULL DEFAULT 'monthly',
            `frequency_unit` varchar(100) NOT NULL,
            `items` text DEFAULT NULL,
            `options` text DEFAULT NULL,
            `status` tinyint(1) NOT NULL DEFAULT 1,
            `custom_order` int(11) DEFAULT NULL,
            `is_default` tinyint(1) NOT NULL DEFAULT 0,
            `is_popular` tinyint(1) NOT NULL DEFAULT 0,
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

        $sql .= "ALTER TABLE `$table` CHANGE `type` `word_used` TEXT NULL DEFAULT NULL;";

        dbDelta($sql);
    }
    //create plan table
    public static function image_table()
    {

        $table = self::prefix() . "app_images";
        $user_table = self::prefix() . 'users';
        $table_user_foreign = $table . "_user_id_foreign";

        $sql = "CREATE TABLE `$table` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `uid` char(36) NOT NULL,
            `user_id` bigint(20) UNSIGNED NOT NULL,
            `subscription_id` int(11) NOT NULL,
            `url` text DEFAULT NULL,
            `path` text DEFAULT NULL,
            `name` varchar(255) DEFAULT NULL,
            `size` text DEFAULT NULL,
            `type` varchar(255) DEFAULT NULL,
            `title` varchar(255) DEFAULT NULL,
            `discription` varchar(255) DEFAULT NULL,
            `options` text DEFAULT NULL,
            `data` text DEFAULT NULL,
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";


        $sql .= "ALTER TABLE `$table` ADD KEY `$table_user_foreign` (`user_id`);";


        $sql .= "ALTER TABLE `$table` ADD CONSTRAINT `$table_user_foreign` FOREIGN KEY (`user_id`) REFERENCES `$user_table` (`ID`) ON DELETE CASCADE; COMMIT; ";

        dbDelta($sql);
    }
    public static function documents_table()
    {

        $table = self::prefix() . "app_documents";
        $user_table = self::prefix() . 'users';
        $table_user_foreign = $table . "_user_id_foreign";

        $sql = "CREATE TABLE `$table` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `uid` char(36) DEFAULT NULL,
            `user_id` bigint(20) UNSIGNED NOT NULL,
            `blog_name` text DEFAULT NULL,
            `blog_title` text DEFAULT NULL,
            `docs_name` text DEFAULT NULL,
            `word_used` text DEFAULT NULL,
            `description` text DEFAULT NULL,
            `text` text DEFAULT NULL,
            `html` text DEFAULT NULL,
            `response` text DEFAULT NULL,
            `options` text DEFAULT NULL,
            `status` tinyint(1) NOT NULL DEFAULT 1,
            `language` text DEFAULT NULL,
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

        $sql .= "ALTER TABLE `$table` ADD KEY `$table_user_foreign` (`user_id`);";

        $sql .= "ALTER TABLE `$table` ADD CONSTRAINT `$table_user_foreign` FOREIGN KEY (`user_id`) REFERENCES `$user_table` (`ID`) ON DELETE CASCADE; COMMIT; ";


        dbDelta($sql);
    }
    public static function purchase_log_table()
    {

        $table = self::prefix() . "app_purchase_log";
        $user_table = self::prefix() . 'users';
        $table_user_foreign = $table . "_user_id_foreign";

        $sql = "CREATE TABLE `$table` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `uid` char(36) DEFAULT NULL,
            `user_id` bigint(20) UNSIGNED NOT NULL,
            `words` varchar(255) DEFAULT NULL,
            `image` varchar(255) DEFAULT NULL,
            `price` varchar(300) DEFAULT NULL,
            `plan_id` varchar(255) DEFAULT NULL,
            `plan_name` varchar(300) DEFAULT NULL,
            `subscription_id` varchar(255) DEFAULT NULL,
            `options` text DEFAULT NULL,
            `payment_method` varchar(255) DEFAULT NULL,
            `status` enum('new','pending','active','ended','renew') NOT NULL DEFAULT 'new',
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
          ";

        $sql .= "ALTER TABLE `$table` ADD KEY `$table_user_foreign` (`user_id`);";

        $sql .= "ALTER TABLE `$table` ADD CONSTRAINT `$table_user_foreign` FOREIGN KEY (`user_id`) REFERENCES `$user_table` (`ID`) ON DELETE CASCADE; COMMIT; ";

        dbDelta($sql);
    }

    public static function subscription_table()
    {

        $table = self::prefix() . "app_subscriptions";
        $user_table = self::prefix() . 'users';
        $plan_table = self::prefix() . 'app_plans';
        $table_user_foreign = $table . "_user_id_foreign";

        $sql = "CREATE TABLE `$table` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `uid` char(36) NOT NULL,
            `user_id` bigint(20) UNSIGNED NOT NULL,
            `plan_id` bigint(20) UNSIGNED NOT NULL,
            `payment_method` varchar(255) DEFAULT NULL,
            `words` varchar(255) NOT NULL,
            `image` varchar(255) NOT NULL,
            `options` text DEFAULT NULL,
            `status` enum('new','pending','active','ended','renew') NOT NULL DEFAULT 'new',
            `paid` tinyint(1) NOT NULL DEFAULT 0,
            `payment_claimed` tinyint(1) NOT NULL DEFAULT 0,
            `current_period_ends_at` timestamp NULL DEFAULT NULL,
            `start_at` datetime DEFAULT NULL,
            `end_at` datetime DEFAULT NULL,
            `end_period_last_days` int(11) NOT NULL DEFAULT 30,
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

        $sql .= "ALTER TABLE `$table` ADD KEY `$table_user_foreign` (`user_id`),
        ADD KEY `$table_user_foreign` (`plan_id`);";

        $sql .= "ALTER TABLE `$table` ADD CONSTRAINT `$table_user_foreign` FOREIGN KEY (`plan_id`) REFERENCES `$plan_table` (`id`) ON DELETE CASCADE, ADD CONSTRAINT `$table_user_foreign` FOREIGN KEY (`user_id`) REFERENCES `$user_table` (`ID`) ON DELETE CASCADE; COMMIT;";

        dbDelta($sql);
    }

    /**
     * auto create plan
     */
    public static function autoPlan()
    {
        $plans = Planconfig::plans();
        if (Plans::count()  === 0) {
            foreach ($plans as $plan) {
                Plans::create($plan);
            }
        } else {
            if (Planconfig::$autoload) {
                foreach ($plans as $plan) {
                    $slug = isset($plan['slug']) ? $plan['slug'] : '';
                    Plans::where('slug', $slug)->update($plan);
                }
            }
        }
    }





    /**
     * database init
     */
    public static function init()
    {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        self::plan_table();
        self::subscription_table();
        self::documents_table();
        self::image_table();
        self::purchase_log_table();

        //seeder
        self::autoPlan();
    }
}
