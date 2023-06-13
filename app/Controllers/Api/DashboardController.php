<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Document;
use App\Models\Images;
use App\Models\Subscriptions;
use App\Models\User;

class DashboardController extends Helpers
{

    //get status for all
    public function index($request = null)
    {
        //top const
        $user_id = User::userid();
        $subscription = Subscriptions::activeSubscription($user_id);
        $plan      = isset($subscription->plan) ? $subscription->plan : null;

        // $this->authrize($request);
        $use_templates = [];
        $word_used = 0;
        $document_chars = [];

        $documents = Document::where('user_id', $user_id)->get();

        foreach ($documents as $document) {
            $db__words = $document->word_used ? intval($document->word_used) : 0;
            $word_used = $word_used + $db__words;
            if (!in_array($document->blog_name, $use_templates)) {
                $use_templates[] = $document->blog_name;
            }

            $document_chars[] = [
                'name' => $document->docs_name,
                'uv'   => 4000,
                'pv'   =>  intval($document->word_used),
            ];
        }

        $data = [
            'created_docs' => Document::where('user_id', $user_id)->count(),
            'images'    => Images::where('user_id', $user_id)->count(),
            'word_used' => $word_used,
            'template_used' => count($use_templates),
            'document_chars' => $document_chars,
            'plan'          => $plan,
            'subscription' => Subscriptions::activeSubscription($user_id),
        ];

        $this->success(['data' => $data]);
    }
}
