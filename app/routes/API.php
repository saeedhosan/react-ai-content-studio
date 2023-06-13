<?php

/**
 * title: api roues make
 * author: appsaeed
 * github: https://github.com/appsaeed
 * Email : appsaeed7@gmail.com
 */

namespace App\Routes;

use App\Controllers\Api\AIHomeController;
use App\Controllers\Api\AuthController;
use App\Controllers\Api\DocumentController;
use App\Controllers\Api\ImageController;
use App\Controllers\Api\PaymentController;
use App\Controllers\Api\PlanController;
use App\Controllers\Api\PurchaseLogController;
use App\Controllers\Api\SubscriptionController;
use App\Controllers\Api\SupportController;
use App\Controllers\Api\DashboardController;
use App\Controllers\Api\TestContoller;
use App\lib\appsaeed\AIRoute;

use App\Models\Plans;

class API
{
    public static function map()
    {

        function getPlans()
        {
            return  Plans::all();
        }
        add_action('rest_api_init', function () {

            AIRoute::get('post_by_url', [new AIHomeController(), 'get_post_by_url']);
            AIRoute::get('page_by_path', [new AIHomeController(), 'page_by_path']);
            AIRoute::post('comments', [new AIHomeController(), 'comment_post']);

            AIRoute::post('signup', [new AuthController(), 'signup']);
            AIRoute::post('login', [new AuthController(), 'login']);
            AIRoute::post('user', [new AuthController(), 'user']);


            /**
             * dashboard api for subscrption
             */
            AIRoute::get('plans', [new PlanController(), 'all']);
            AIRoute::post('checkout/stripe', [new PaymentController(), 'stripeCharge']);
            AIRoute::post('subscription', [new SubscriptionController(), 'activeSubscription']);


            //images
            AIRoute::get('images', [new ImageController(), 'index']);
            AIRoute::post('images/create', [new ImageController(), 'create']);
            AIRoute::post('images/delete', [new ImageController(), 'delete']);
            //docuemnts
            AIRoute::get('documents', [new DocumentController(), 'index']);
            AIRoute::get('documents/test', [new DocumentController(), 'test']);
            AIRoute::post('documents/create', [new DocumentController(), 'create']);
            AIRoute::post('documents/delete', [new DocumentController(), 'delete']);
            AIRoute::post('documents/archive', [new DocumentController(), 'archive']);
            AIRoute::post('documents/update', [new DocumentController(), 'update']);

            //Support
            AIRoute::get('supports', [new SupportController(), 'index']);
            AIRoute::post('support/reply', [new SupportController(), 'reply']);
            AIRoute::post('support/create', [new SupportController(), 'create']);
            AIRoute::get('subscription/cancel', [new SupportController(), 'cancel']);

            //purchase log
            AIRoute::get('purchase', [new PurchaseLogController(), 'index']);

            //dashboard
            AIRoute::get('dashboard', [new DashboardController(), 'index']);

            //test route
            AIRoute::get('test', [new TestContoller(), 'index']);
        });
    }
}
