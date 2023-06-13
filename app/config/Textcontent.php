<?php

namespace App\config;

class Textcontent
{
    /**
     * homepage context
     */
    public static function homepage()
    {
        return [
            /**
             * hero section text content
             */
            "hero_section"    => [
                'welcome'     => 'Premium Content In Seconds',
                'title'       => 'The Future of Content Writing',
                'typing'      => [
                    "<h1><span class=''>Premium Quality Content</h1>",
                    "<h1><span class=''>Engaging Blog Posts</span></h1>",
                    "<h1><span class=''>Amazing SEO Content</span></h1>",
                    "<h1><span class=''>Creative Content Ideas</span></h1>",
                    "<h1><span class=''>Authority Content</span></h1>",
                    "<h1><span class=''>Premium Quality Images</span></h1>",
                    "<h1><span class=''>And So Much More!</span></h1>",
                ],
                'description'   => 'Start Your Free Trial Today!',
                'button_text'   => "Begin Trial",
                'bgImage'       =>
                "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            ],
            /**
             * features text content
             */
            'features_section' => [
                'title' => "RightWrite.io Overview",
                'text'  => "RightWrite.io creates premium content for you in seconds.",
                'bg_image' => '',
                'bg_color' => '',

            ],
            /**
             * templates text content
             */
            "template_section" => [
                'title'     => 'Unlimited Content Types',
                'text'      => "Your options are endless. Here are just a few."
            ],

            /**
             * priching text content
             */
            "pricing_section"  => [
                'title'         => 'Flexible Plans & Pricing',
                'text'          => 'Choose the best plan for your needs.',

            ],

            /**
             * faqs section text content
             */
            "faqs_section"      => [
                'title'         => 'Frequently Asked Questions',
                'text'          => "Here are a few questions we've answered for you."
            ],

            /**
             * contact section text content
             */
            "contact_section"   => [
                'title'     => 'Get In Touch With Us',
                'text'      => "We're excited to hear from you. Please use the form below to get in touch!",
                'bg_image'  => 'https://raw.githubusercontent.com/appsaeed/assets/main/images/bg/login-v2.svg'
            ],

            /**
             * footer section
             */
            "footer_section"    => [
                'app_logo'  => null,
                "text"      => 'Premium Content In Seconds',
                /**
                 * footer column 1
                 */
                'column_1' => [
                    'title' => 'RightWrite.io',
                    'items' => [
                        [
                            'name'  => 'Account',
                            '_url'  => '/user/dashboard',
                        ],
                        [
                            'name'  => 'Contact',
                            '_url'  => '/contact'
                        ],
                        [
                            'name'  => 'Help',
                            '_url'  => '/Help'
                        ]
                    ],
                ],

                /**
                 * footer column 2
                 */

                'column_2' => [
                    'title' => 'Legal',
                    'items' => [
                        [
                            'name'  => 'Privacy Policy',
                            '_url'  => '/privacy-policy',
                        ],
                        [
                            'name'  => 'Terms of Service',
                            '_url'  => '/terms-of-service',
                        ]
                    ],
                ],

                /**
                 * footer column 3
                 */

                'column_3' => [
                    'title' => 'Get In Touch',
                    'items' => [
                        [
                            'name'  => 'contact@rightwrite.io',
                            '_url'  => 'mailto:contact@rightwrite.io',
                        ],
                        [
                            'name'  => 'RightWrite.io',
                            '_url'  => '/rightWrite.io',
                            'to_mail' => true,
                        ],
                    ],
                ],

                /**
                 * copyright text and links
                 */
                'copyright' => [
                    'name' => '',
                    '_url' => '',
                    'items' => [
                        [
                            'name' => 'Terms & Conditions',
                            '_url' => '/terms-and-conditions',
                        ],

                        [
                            'name' => 'Privacy Policy',
                            '_url' => '/privacy-terms',
                            'slug' => "|",
                        ]
                    ],

                ]

            ]
        ];
    }

    public static function dashobard()
    {
        return [
            'affiliate_url' => get_site_url() .  '/affiliate-home',
        ];
    }
}
