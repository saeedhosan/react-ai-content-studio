<?php
namespace App\lib\appsaeed;

/**
 * title: api roue class
 * author: appsaeed
 * github: https://github.com/appsaeed
 * Email : appsaeed7@gmail.com
 */
class AIRoute
{

    /**
     * define route in wordpres rest api
     * @param string $route
     * @param methods
     */
    public static function get($route, $methods)
    {
        register_rest_route(
            APS_REST_URL,
            $route,
            [
                'methods' => 'GET',
                'callback' => $methods,
                'permission_callback' => '__return_true',
            ]
        );
    }
    /**
     * define route in wordpres rest api
     * @param string $route
     * @param methods
     */
    public static function post($route, $methods)
    {
        register_rest_route(
            APS_REST_URL,
            $route,
            [
                'methods' => 'POST',
                'callback' => $methods,
                'permission_callback' => '__return_true',
            ]
        );
    }

}
