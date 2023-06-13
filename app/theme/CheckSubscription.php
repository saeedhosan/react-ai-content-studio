<?php

namespace App\theme;

use App\Models\PurchaseLog;
use App\Models\Subscriptions;
use App\Models\User;

class CheckSubscription
{

    public static function onChange()
    {
        $subscription = Subscriptions::activeSubscription();

        if (!Subscriptions::activeSubscription(null, true) && $subscription) {
            Subscriptions::where('user_id', User::userid())->update([
                'status' => 'ended'
            ]);
            $id = $subscription->id ? $subscription->id : 0;
            PurchaseLog::where('subscription_id', $id)->update([
                'status' => 'ended'
            ]);
        }
    }
}
