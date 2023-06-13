<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Subscriptions;

class SubscriptionController extends Helpers
{

    /**
     * get all subscription
     */
    public function index()
    {
    }

    /**
     * get subscription status for current user
     */
    public function activeSubscription()
    {
        if (Subscriptions::activeSubscription()) {
            $data = Subscriptions::activeSubscription();
            $data->plan = Subscriptions::activeSubscription()->plan;
            $this->success($data);
        }

        return null;
    }
}
