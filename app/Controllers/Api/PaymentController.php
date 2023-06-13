<?php

namespace App\Controllers\Api;

use App\config\Settings;
use App\helpers\Helpers;
use App\Models\Plans;
use App\Models\PurchaseLog;
use App\Models\Subscriptions;
use App\Models\User;

class PaymentController extends Helpers
{
    public function stripeCharge($request = null)
    {

        try {
            $stripe_screet = Settings::backend('stripe_screet');
            $parms = $request->get_json_params();
            $amount = isset($parms['amount']) ? $parms['amount'] : "";
            $source = isset($parms['source']) ? $parms['source'] : "";
            $plan_id = isset($parms['plan_id']) ? $parms['plan_id'] : "";
            $currency = Settings::get('app_currency') ?? 'USD';
            $description = $request->description ?? 'stripe payment charging';

            $paymentdata = isset($parms['payment_data']) ? $parms['payment_data'] : [];

            if (empty($amount)) {
                $this->error('somthing went worng amount not found', 500);
            } elseif (empty($source)) {
                $this->error('Somthing went worng stripe details not found', 500);
            } elseif (empty($plan_id)) {
                $this->error('Somthing went wrong plan was missing!', 500);
            }


            $stripe = new \Stripe\StripeClient($stripe_screet);

            $response = $stripe->charges->create([
                'amount' => $amount,
                'currency' => $currency,
                'source' => $source, // obtained with Stripe.js
                'description' => $description,
            ]);

            $plan = Plans::find($plan_id);

            $options = [
                'plan' => $plan,
                'user_sent' => $parms,
                'payment_response' => $response,
                'payment_data' => $paymentdata,
            ];

            $plan_image = $plan->image();
            $plan_words = $plan->words();
            $plan_start_date = $plan->start_date();
            $plan_end_date = $plan->end_date();
            $plan_name     = $plan->name ?? '';
            $payment_method = 'stripe';

            if ($response->status === 'succeeded') {

                $user_id = 0;

                if (!property_exists(User::get(), 'ID')) {
                    $this->error('there was an error for user id');
                } else {
                    $user_id = User::get()->ID;
                }

                if (Subscriptions::where('user_id', $user_id)->count() < 1) {
                    Subscriptions::create([
                        'uid' => uniqid(time()),
                        'user_id' => $user_id,
                        'plan_id' => $plan->id,
                        'payment_method' => $payment_method,
                        'options' => json_encode($options),
                        'words' => $plan->words(),
                        'image' => $plan->image(),
                        'current_period_ends_at' => $plan_end_date,
                        'start_at' => $plan_start_date,
                        'end_at' => $plan_end_date,
                        'status' => 'active',
                        'paid' => true,
                    ]);
                }

                $subscription = Subscriptions::where('user_id', $user_id)->first();



                Subscriptions::where('id', $subscription->id)->update([
                    'plan_id' => $plan->id,
                    'payment_method' => $payment_method,
                    'options' => json_encode($options),
                    'words' => $plan_words,
                    'image' => $plan_image,
                    'current_period_ends_at' => $plan_end_date,
                    'start_at' => $plan_start_date,
                    'end_at' => $plan_end_date,
                    'status' => 'active',
                    'paid' => true,
                ]);

                PurchaseLog::where('user_id', User::userid())->update(['status' => 'ended']);

                PurchaseLog::create([
                    'uid' => uniqid(),
                    'user_id' => User::userid(),
                    'words'  => $plan_words,
                    'image'  => $plan_image,
                    'plan_id' => $plan->id,
                    'subscription_id' => $subscription->id,
                    'payment_method' => $payment_method,
                    'status' => 'active',
                    'plan_name' => $plan_name,
                    'price' => $amount
                ]);

                $this->success([
                    'success' => true,
                    'message' => 'payment successfully created'
                ]);
            }

            $this->error('payment faild to success please contact to the owner', 500);
        } catch (\Throwable $th) {
            $this->error($th->getMessage(), 500);
        }
    }

    public function testing()
    {
        return Settings::plans();
    }
}
