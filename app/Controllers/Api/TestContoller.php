<?php

namespace App\Controllers\Api;

use App\Models\PurchaseLog;

class TestContoller
{


    public function index()
    {



        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.openai.com/v1/completions',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{
    "model": "text-davinci-003",
    "prompt": "Say this is a test",
    "max_tokens": 7,
    "temperature": 0
}',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer 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',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        var_dump($response);
    }


    public function test()
    {
    }
}
