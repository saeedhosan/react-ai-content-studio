<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\PurchaseLog;
use App\Models\Subscriptions;
use App\Models\User;

class PurchaseLogController extends Helpers
{

    /**
     * get all purchase history for loggin user 
     */
    public function index($request = null)
    {

        $this->authrize($request);

        $logs = PurchaseLog::where('user_id', User::userid())->orderBy('id', 'desc')->get();

        $this->success([
            'logs' => $logs
        ]);
    }
}
