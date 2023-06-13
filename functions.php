<?php

/**
 * Name: Saeed hossen
 *
 */

define('APS_VERSION', '3.1');
define('APS_THEME_PATH', get_template_directory_uri());
define('APS_REST_URL', 'api/v1');
define('KB', 1024);
define('MB', 1048576);
define('GB', 1073741824);
define('TB', 1099511627776);

require_once 'app/lib/wp-router/wp-router.php';
require_once 'vendor/autoload.php';

use App\routes\API as APIRouts;
use App\routes\Web as WebRoutes;
use App\theme\ThemeSetup;

$theme = new ThemeSetup();
$theme->init();
APIRouts::map();
WebRoutes::map();


/**
 * show application password for rest api authentication
 */
// add_filter('wp_is_application_passwords_available', '__return_true');

/***
 * hide/disable admin bar for all user
 */
add_filter('show_admin_bar', '__return_false');
