<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Comments;
use App\Models\Subscriptions;
use App\Models\User;


class SupportController extends Helpers
{

    public function index($request = null)
    {
        // $this->authrize($request);
        $data = [];
        $supports =  Comments::where(['user_id' => User::userid(), 'comment_type' => 'support'])->get();

        foreach ($supports as $support) {

            $comments = get_comments([
                'parent' => $support->comment_ID,
                'orderby'  => 'ASC',
                'order'  => 'ASC',
            ]);;
            $support->children = $comments;
            $data[] = $support;
        }

        $this->success([
            'data' => $data
        ]);
    }

    /**
     * create support trket
     * 
     */
    public function create($request)
    {

        try {
            $parms = $request->get_params();
            $attache = '';

            if ($this->has_file('attache')) {
                $mimes = [
                    'txt', 'csv', 'doc', 'jpg', 'jpeg', 'gif', 'png', 'mp4', 'json', 'zip',
                ];

                if (!$this->allow_mimes('attache', $mimes)) {
                    $this->error('We are not allow this file!');
                }

                $attache = $this->wp_upload_ajax('attache');
            }

            $page = get_page_by_path('dashboard_support');
            $page_id = $page->ID ? $page->ID : 0;
            $user_name = User::get()->data->display_name ?? 'unknown';
            $user_email = User::get()->data->user_email ?? 'unknown';
            //get request
            $subject    = isset($parms['subject']) ? $parms['subject'] : 'no subject';
            $message    = isset($parms['message']) ? $parms['message'] : 'no message';

            $content    = "";
            if ($attache) {
                $content    .= "<br/><b>Attachment</b>: <a target='_blank' href='$attache' alt='file'>See attachment</a><br/><br>";
            }
            $content .= "<div class='support-message'>$message</div>";

            $data = array(
                'user_id'   => User::userid(),
                'comment_author' => 'Support Request by: ' . $user_name,
                'comment_author_email' => $user_email,
                'comment_author_url' => uniqid(),
                'comment_author_IP' => $subject,
                'comment_content' => $content,
                'comment_post_ID' =>  $page_id,
                'comment_agent' => $_SERVER['HTTP_USER_AGENT'],
                'comment_type' => 'support',
                'comment_date' => date('Y-m-d H:i:s'),
                'comment_date_gmt' => date('Y-m-d H:i:s'),
                'comment_approved' => 0,
            );

            wp_insert_comment($data);

            $this->success('support created successfull!');
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }


    /**
     * wp reply comment 
     * 
     */
    public function reply($request = null)
    {

        try {
            $parms = $request->get_json_params();

            if (!isset($parms['username'])) {
                $this->error('required username field not found');
            } elseif (!isset($parms['message'])) {
                $this->error('required message field not found');
            } elseif (!isset($parms['comment_id'])) {
                $this->error('required support id field not found');
            }

            $email =  $parms['email'];
            $username =  $parms['username'];
            $email =  isset($parms['email']) ? $parms['email'] : '';
            $message =  $parms['message'];
            $comment_id = $parms['comment_id'];

            $data = array(
                'user_id'   => User::userid(),
                'comment_parent' =>  $comment_id,
                'comment_author' =>  $username,
                'comment_author_email' => $email,
                'comment_author_url' => '',
                'comment_content' => $message,
                'comment_agent' => $_SERVER['HTTP_USER_AGENT'],
                'comment_type' => 'comment',
                'comment_date' => date('Y-m-d H:i:s'),
                'comment_date_gmt' => date('Y-m-d H:i:s'),
                'comment_approved' => 0,
            );

            wp_insert_comment($data);

            $this->success('Message successfully replied!');
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }


    /**
     * cancel user subscption
     */
    public function cancel($request = null)
    {
        try {
            // $parms = $request->get_json_params();
            // $subscription_id = isset($parms['id']) ? $parms['id'] : 0;

            //check authrize
            $this->authrize($request);

            //check is subscrption has
            $this->subscribe();



            if (Subscriptions::cancel()) {
                $this->success('Subscription canceled');
            }

            $this->error('Something went worng please try again later');
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }
}
