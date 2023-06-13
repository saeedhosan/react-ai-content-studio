<?php

namespace App\theme;

use App\Models\User;

class ThemeSetup
{
    /**
     * create init page required
     */
    public function createPage()
    {
        $pages = ['login', 'signup', 'dashboard_support'];

        foreach ($pages as $page) {
            $check_page = get_page_by_path($page);
            if (empty($check_page)) {
                wp_insert_post(
                    [
                        'comment_status' => 'close',
                        'ping_status' => 'close',
                        'post_author' => User::userid() ?? 1,
                        'post_title' => $page, //ucwords($page)
                        'post_name' => strtolower(str_replace(' ', '-', trim($page))),
                        'post_status' => 'publish',
                        'post_content' => $page,
                        'post_type' => 'page',
                        'post_parent' => 'id_of_the_parent_page_if_it_available',
                    ]
                );
            }
        }
    }

    /**
     * create api rest field
     */
    public function api_post_field()
    {
        add_action('rest_api_init', function () {
            register_rest_field(
                'regions',
                'group',
                array(
                    'get_callback' => 'get_post_meta_for_api',
                    'schema' => null,
                )
            );
        });
    }

    /**
     * add/support menu
     */
    public function menu()
    {
        add_action('init', function () {
            register_nav_menus(
                array(
                    'primary-menu' => __('Header Menu'),
                    'secondary-menu' => __('Footer Menu'),
                )
            );
        });
    }

    /**
     * wp support theme post meta
     */
    public function after_setup_theme()
    {
        add_action('after_setup_theme', function () {
            add_theme_support('title-tag');
            add_theme_support('post-thumbnails');
        });
    }

    /**
     * make re-useable function for theme global
     */
    public function useFunction()
    {
        /**
         * make asset function to add style and javascript src
         */
        function assets($path = '', $version = APS_VERSION)
        {
            echo APS_THEME_PATH . $path . '?v=' . $version;
        }

        /**
         * use theme directory without echo
         */
        function mixup($path = '', $version = APS_VERSION)
        {
            return APS_THEME_PATH . $path . '?v=' . $version;
        }
    }



    /**
     * appsaeed theme init
     */
    public function init()
    {
        $this->useFunction();
        $this->createPage();
        $this->api_post_field();
        $this->menu();
        $this->after_setup_theme();
        Database::init();
        CheckSubscription::onChange();
    }
}
