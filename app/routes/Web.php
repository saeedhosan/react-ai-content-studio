<?php

namespace App\routes;

use App\config\Settings;

class Web
{

    public static function map()
    {
        add_action('wp_router_generate_routes', function ($router) {
            $router->add_route('login', array(
                'path' => 'login',
                'access_callback' => true,
                'page_callback' => function () {
                    load_template(get_template_directory() . '/index.php', false);
                    exit();
                },
            ));
        });

        add_action('wp_router_generate_routes', function ($router) {
            $router->add_route('signup', array(
                'path' => 'signup',
                'access_callback' => true,
                'page_callback' => function () {
                    load_template(get_template_directory() . '/index.php', false);
                    exit();
                },
            ));
        });

        add_action('wp_router_generate_routes', function ($router) {
            $router->add_route(Settings::get('dashboard_path'), array(
                'path' => Settings::get('dashboard_path'),
                'access_callback' => true,
                'page_callback' => function () {
                    if (!is_user_logged_in()) {
                        wp_redirect(Settings::get('app_url') . '/login');
                    }
                    load_template(get_template_directory() . '/user.php', false);
                    exit();
                },
            ));
        });

        add_action('wp_router_generate_routes', function ($router) {
            $router->add_route('logout', array(
                'path' => 'logout',
                'access_callback' => true,
                'page_callback' => function () {
                    wp_logout();
                    wp_destroy_current_session();
                    wp_clear_auth_cookie();
                    wp_safe_redirect(home_url());
                    exit();
                },
            ));
        });
    }
}
