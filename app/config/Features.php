<?php

namespace App\config;

use function App\theme\mixup;

class Features
{
    public static function all()
    {
        return [
            [
                "name" => "PREMIUM QUALITY CONTENT",
                "content" => "Amazing content in seconds.",
                "box_theme" => "light",
                "image" => mixup('/assets/images/features-01.png'),
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ],
            [
                "name" => "ACCURATE AND FAST",
                "content" => "Engaging and precise writing.",
                "box_theme" => "dark",
                "image" => "https://write4me.co/img/files/09.png",
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ],
            [
                "name" => "COST EFFECTIVE",
                "content" => "Extremely affordable, premium content.",
                "box_theme" => "dark",
                "image" => mixup('/assets/images/features-03.png'),
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ],
            [
                "name" => "CREATIVE CONTENT IDEAS",
                "content" => "Never suffer from writer's block again.",
                "box_theme" => "light",
                "image" => mixup('/assets/images/features-04.png'),
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ],
            [
                "name" => "PREMIUM IMAGES",
                "content" => "Generate images to illustrate your writing.",
                "box_theme" => "light",
                "image" => mixup('/assets/images/features-05.png'),
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ],
            [
                "name" => "and much more!",
                "content" => "Your possibilities are endless.",
                "box_theme" => "dark",
                "image" => mixup('/assets/images/features-06.png'),
                "aos" => [
                    "zoom" => "zoom-in",
                    "delay" => 400,
                    "once" => true,
                    "duration" => 700
                ]
            ]
        ];
    }
}
