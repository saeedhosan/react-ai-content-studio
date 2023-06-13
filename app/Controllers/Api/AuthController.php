<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Plans;
use App\Models\Subscriptions;

class AuthController extends Helpers
{

    public function wp_rest_user_endpoints()
    {
        /**
         * Handle Register User request.
         */
        register_rest_route('wp/v2', 'users/register', array(
            'methods' => 'POST',
            'callback' => 'wc_rest_user_endpoint_handler',
        ));
    }

    /**
     * Register a new user
     *
     * @param  WP_REST_Request $request Full details about the request.
     * @return array $args.
     **/
    public function signup($request = null)
    {

        try {
            $parameters = $request->get_json_params();
            $username = sanitize_user($parameters['username']);
            $email = sanitize_email($parameters['email']);
            $password = sanitize_text_field($parameters['password']);
            $firstname = sanitize_text_field($parameters['firstname']);
            $lastname = sanitize_text_field($parameters['lastname']);
            // $role = sanitize_text_field( $parameters['role']);

            //required field
            if (empty($username)) {
                $this->error('Username Field is required');
            }
            if (empty($email)) {
                $this->error('Email Field is required');
            }
            if (empty($password)) {
                $this->error('Password Field is required');
            }

            if (!is_email($email)) {
                $this->error('E-mail address is invalid');
            }

            if (!validate_username($username) || in_array($username, ['admin'])) {
                $this->error('Username is invalid');
            }

            //check if user exits or not {
            if (username_exists($username)) {

                $this->error('Username already exists, please try another username');
            } elseif (email_exists($email)) {

                $this->error('email already exists, please try Reset Password');
            } else {

                $user_id = wp_create_user($username, $password, $email);

                if (!is_wp_error($user_id)) {
                    // Get User Meta Data (Sensitive, Password included. DO NOT pass to front end.)
                    $user = get_user_by('id', $user_id);
                    // $user->set_role( $role );
                    $user->set_role('subscriber');

                    // WooCommerce specific code
                    if (class_exists('WooCommerce')) {
                        $user->set_role('customer');
                    }

                    $userdata = [
                        'ID' => $user->ID,
                        'user_pass' => $user->user_pass,
                        'user_login' => $user->user_login,
                        'user_nicename' => $username,
                        'user_url' => get_site_url(),
                        'user_email' => $user->user_email,
                        'display_name' => $user->display_name,
                        'nickname' => 'nkname',
                        'first_name' => $firstname,
                        'last_name' => $lastname,
                        'description' => 'new user',
                        'rich_editing' => true, // false - disable the visual editor
                        'role' => 'subscriber', // (string) user role
                    ];

                    wp_update_user($userdata);
                    wp_new_user_notification($user->ID, 'both');

                    wp_clear_auth_cookie();
                    wp_set_current_user($user->ID); // Set the current user detail
                    wp_set_auth_cookie($user->ID);

                    $plan = Plans::default();

                    Subscriptions::create([
                        'uid' => uniqid(time()),
                        'user_id' => $user->ID,
                        'plan_id' => $plan->id,
                        'words' => $plan->words(),
                        'image' => $plan->image(),
                        'start_at' => $plan->start_date(),
                        'end_at' => $plan->end_date(),
                        'status' => 'active',
                    ]);

                    $this->success([
                        'success' => true,
                        'message' => 'Account registration was Successful',
                        'user' => $user,
                    ]);
                } else {
                    return $user_id;
                }
            }
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }

    /**
     * wordpress method login
     *
     */

    public function login($request = null)
    {

        $parms = $request->get_json_params();
        $username = isset($parms['username']) ? $parms['username'] : 'wdpro';
        $password = isset($parms['password']) ? $parms['password'] : 'saeed7890';
        $remember = isset($parms['remember']) ? $parms['remember'] : false;

        $data = [
            'user_login' => $username,
            'user_password' => $password,
            'remember' => $remember,
        ];

        $user = wp_signon($data, false);

        if (is_wp_error($user)) {
            $this->error($user->get_error_message());
        } else {
            wp_clear_auth_cookie();
            wp_set_current_user($user->ID); // Set the current user detail
            wp_set_auth_cookie($user->ID); // Set auth details in cookie

            $this->success([
                'success' => true,
                'message' => 'Logged in successfully',
                'data' => $user,
            ]);
        }
    }

    /**
     * wp logout api
     */
    public function logout()
    {
        add_action('wp_logout', 'auto_redirect_after_logout');

        function auto_redirect_after_logout()
        {
            wp_safe_redirect(home_url());
            exit;
        }
    }

    /**
     * wp get user if logged in
     */
    public function user($request = null)
    {
        $nonce = '';

        if (array_key_exists('x_wp_nonce', $request->get_headers()) && count($request->get_headers()['x_wp_nonce']) > 0) {
            $nonce = $request->get_headers()['x_wp_nonce'][0];
        }

        if (is_user_logged_in()) {
            if (wp_verify_nonce($nonce, 'wp_rest')) {
                $user = wp_get_current_user();
                if ($user->data) {
                    if ($user->data->user_pass) {
                        unset($user->data->user_pass);
                        unset($user->data->user_activation_key);
                    }
                }
                $user->image = get_avatar_url($user->ID);
                $this->success([
                    'success' => true,
                    'message' => 'user success to get',
                    'user' => $user,
                ]);
            } else {
                $this->error("User couldn't not found");
            }
        } else {
            return false;
        }
    }
}
