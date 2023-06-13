<?php

namespace App\config;

use Illuminate\Support\Testing\Fakes\BusFake;

class Planconfig
{
    /**
     * set  as true if want to update always when update plan done 
     * please stop auto update by set false for parformance
     * @param bool $autoload
     * @return bool
     */
    public static $autoload = false;

    /**
     * This can be update for customize plans 
     * @return array plans
     */
    public static function plans()
    {
        return [
            [
                "name"          => 'professional',
                "slug"          => 'professional',
                "words"         => 1000,
                "image"         => 10,
                "description"   => 'this is an professional plan',
                "price"         => 100,
                "billing_cycle" => 'monthly',
                "frequency_unit" => 1,
                "items"         => json_encode([
                    '1000 words',
                    '10 images',
                    'All templates',
                    'Unlimited access',
                    'Full time support'
                ]),
                "is_default" => true,
                "is_popular" => false,
            ],
            [
                "name"          => 'Team',
                "slug"          => 'team',
                "words"         => 22000,
                "image"         => 10,
                "description"   => 'this is an team plan',
                "price"         => 200,
                "billing_cycle" => 'monthly',
                "frequency_unit" => 1,
                "items"         => json_encode([
                    '22000 words',
                    '40 images',
                    'All templates',
                    'Unlimited access',
                    'Full time support'
                ]),
                "is_default" => false,
                "is_popular" => true,
            ],
            [
                "name"          => 'Business',
                "slug"          => 'business',
                "words"         => 600000,
                "image"         => 100,
                "description"   => 'this is an business plan',
                "price"         => 600,
                "billing_cycle" => 'monthly',
                "frequency_unit" => 1,
                "items"         => json_encode([
                    '22000 words',
                    '40 images',
                    'All templates',
                    'Unlimited access',
                    'Full time support'
                ]),
                "is_default" => false,
                "is_popular" => true,
            ],

        ];
    }
}
