<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;

class AIHomeController extends Helpers
{

    public function index()
    {
        $data = [
            get_the_tags(),
        ];
        wp_send_json($data, 200);
        //return json_encode(['message' => 'hello world']);
    }

    public function page_by_path($request = null)
    {
        $name = $request->get_param('name');

        $page = (object) get_page_by_path($name);
        if ($page) {


            $page->image = get_the_post_thumbnail_url($page->ID);
        }

        $this->success([
            'page' => $page,
        ]);
    }

    /**
     * get post or page by url
     */

    public function get_post_by_url($request = null)
    {
        $url = $request->get_param('url') ? $request->get_param('url') : null;
        if (!$url) {
            $this->error('url not found to get page or post');
        }
        try {

            $id = url_to_postid($url);
            $post = get_post($id, ARRAY_A);
            $post['post_content'] = $this->render_post_block($post['post_content']);

            $post['author_meta'] = [
                "admin_color" => get_the_author_meta("admin_color", $post["post_author"]),
                "aim" => get_the_author_meta("aim", $post["post_author"]),
                "comment_shortcuts" => get_the_author_meta("comment_shortcuts", $post["post_author"]),
                "description" => get_the_author_meta("description", $post["post_author"]),
                "display_name" => get_the_author_meta("display_name", $post["post_author"]),
                "first_name" => get_the_author_meta("first_name", $post["post_author"]),
                "ID" => get_the_author_meta("ID", $post["post_author"]),
                "jabber" => get_the_author_meta("jabber", $post["post_author"]),
                "last_name" => get_the_author_meta("last_name", $post["post_author"]),
                "nickname" => get_the_author_meta("nickname", $post["post_author"]),
                "plugins_last_view" => get_the_author_meta("plugins_last_view", $post["post_author"]), "plugins_per_page" => get_the_author_meta("plugins_per_page", $post["post_author"]),
                "rich_editing" => get_the_author_meta("rich_editing", $post["post_author"]),
                "syntax_highlighting" => get_the_author_meta("syntax_highlighting", $post["post_author"]), "user_activation_key" => get_the_author_meta("user_activation_key", $post["post_author"]), "user_description" => get_the_author_meta("user_description", $post["post_author"]),
                "user_email" => get_the_author_meta("user_email", $post["post_author"]),
                "user_firstname" => get_the_author_meta("user_firstname", $post["post_author"]),
                "user_lastname" => get_the_author_meta("user_lastname", $post["post_author"]),
                "user_level" => get_the_author_meta("user_level", $post["post_author"]),
                "user_login" => get_the_author_meta("user_login", $post["post_author"]),
                "user_nicename" => get_the_author_meta("user_nicename", $post["post_author"]),
                "user_registered" => get_the_author_meta("user_registered", $post["post_author"]),
                "user_status" => get_the_author_meta("user_status", $post["post_author"]),
                "user_url" => get_the_author_meta("user_url", $post["post_author"]),
            ];
            $post['featured_image'] = wp_get_attachment_url(get_post_thumbnail_id($id));

            $this->success($post);
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }

        $this->error('page or post not found');
    }

    public function comment_post($request = null)
    {
        try {
            $parms = $request->get_json_params();

            $fname = isset($parms['fname']) ? $parms['fname'] : "";
            $lname = isset($parms['lname']) ? $parms['lname'] : "";
            $email = isset($parms['email']) ? $parms['email'] : null;
            $phone = isset($parms['phone']) ? $parms['phone'] : null;
            $message = isset($parms['message']) ? $parms['message'] : null;

            if (empty($message)) {
                $this->error('You must enter a email address to contact us!');
            } elseif (empty($message)) {
                $this->error('Please type your messge!');
            }

            $user_agent = $_SERVER['HTTP_USER_AGENT'];

            $data = array(
                'comment_author' => "Contact: " . $fname . " " . $lname,
                'comment_author_email' => $email,
                'comment_author_url' => '',
                'comment_content' => $message,
                'comment_author_IP' => "phone: " . $phone,
                'comment_agent' => $user_agent,
                'comment_type' => 'commment',
                'comment_date' => date('Y-m-d H:i:s'),
                'comment_date_gmt' => date('Y-m-d H:i:s'),
                'comment_approved' => 0,
            );

            wp_insert_comment($data);

            $this->success([
                'success' => true,
                'message' => 'Thank you so much for contact us our team will response soon!',
            ]);
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }
}
