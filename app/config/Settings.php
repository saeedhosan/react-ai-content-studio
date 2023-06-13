<?php

namespace App\config;

use App\config\FAQ;
use App\Models\Plans;

use function App\theme\assets;
use function App\theme\mixup;

class Settings
{
    /**
     * making config settings for react frontend
     */
    public static function all()
    {
        return [
            'app_url' => get_site_url(),
            'app_name' => 'rightwrite',
            'app_title' => get_bloginfo(),
            'app_icon' => get_site_icon_url(),
            'app_nonce' => wp_create_nonce('wp_rest'),
            'wp_rest_url' => get_rest_url() . 'wp/v2/',
            'app_rest_url' => get_rest_url() . APS_REST_URL,
            'app_currency' => 'USD',
            'route_hompage' => 'wordpress.com',
            'route_dashboard' => 'wordpress.com/user',
            'dashboard_path' => 'user',
            'app_theme_path'  => APS_THEME_PATH,
            'app_stripe_key' => 'pk_test_51MqZQWIlkqN6DZkb1PYJeXo7MFJzin33XtY98CGLRbIxCMULTuKVJwUrcuJOBclEf9JvQ0NZzlrLDMtWP5971bjk00PJRLcvgb',
        ];
    }

    /**
     * setting up for backend so this config should not be public 
     */
    public static function allBackend()
    {
        return [
            /**
             * stripe screet key 
             */
            'stripe_screet' => 'sk_test_51MqZQWIlkqN6DZkbE7E7BaP6XVzBxMujlrgp2mizjj32DGwxG0xjhX5k3rU9KhdtD4VjwSLgSjqxEdPwohKtipE200yEy9LziG',
            /**
             * stripe screet key 
             */
            'openai_key'    => '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'
        ];
    }

    /**
     * You should not touch under this methods
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     * ========================================
     */

    /**
     * method makeing ready for fontend data display
     */
    public static function react()
    {
        return wp_json_encode(self::all());
    }

    /**
     * 
     */
    public static function react_homepage()
    {
        return wp_json_encode([
            'faqs' => FAQ::all(),
            'features' => Features::all(),
            'templates' => Templates::homepage()
        ]);
    }

    /**
     * 
     */
    public static function react_dashboard()
    {
        return wp_json_encode([
            'templates' => Templates::dashboard()
        ]);
    }

    /**
     * get all plan
     */
    public static function plans()
    {
        return wp_json_encode(Plans::all()->toArray());
    }

    /**
     * get settting 
     */
    public static function get($name = null)
    {
        return isset(self::all()[$name]) ? self::all()[$name] : '';
    }

    /**
     * setting up for backend
     * 
     */
    public static function backend($name = null)
    {
        return isset(self::allBackend()[$name]) ? self::allBackend()[$name] : '';
    }
}
