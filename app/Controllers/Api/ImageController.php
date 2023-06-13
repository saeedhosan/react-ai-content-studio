<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Images;
use App\Models\Subscriptions;
use App\Models\User;

class ImageController extends Helpers
{

    /**
     * get all  generated images
     */
    public function index($request = null)
    {

        $this->authrize($request);
        $images = Images::where('user_id', User::userid())->orderBy('id', 'DESC')->get();
        wp_send_json($images);
    }

    /**
     * create image with open ai
     */
    public function create($request = null)
    {

        try {

            $this->authrize($request);

            $this->subscribe();

            $this->canGenererateImage();

            $parms = $request->get_json_params();
            $size = isset($parms['size']) ? $parms['size'] : '256x256';
            $prompt = isset($parms['prompt']) ? $parms['prompt'] : 'girl';
            $title = isset($parms['title']) ? $parms['title'] : '';

            $response = $this->openai('/images/generations', [
                "prompt" => $prompt,
                "n" => 1,
                "size" => $size,
                "response_format" => "b64_json",
            ]);

            $base64_string = $response->data[0]->b64_json;
            $image_url     = $this->upload_base64_image($base64_string, $prompt);


            Images::create([
                'uid'               => uniqid(),
                'user_id'           => User::userid(),
                'subscription_id'   => Subscriptions::activeSubscription()->id,
                'url'               => $image_url,
                'path'              => $base64_string,
                'size'              => $size,
                'name'              => $prompt,
                'title'             => $title,
                // 'data'              => $response
            ]);

            Subscriptions::activeSubscription()->decressdImage();

            $this->success('Image successfully generated!');

            //done
        } catch (\Throwable $th) {
            $this->error($th->getMessage(), 500);
        }
    }
    /**
     * delete generated image by id
     */
    public function delete($request = null)
    {
        $id = $request->get_param('id');

        if (empty($id)) {
            $this->error('not able to delete id missing');
        }

        if (Images::where('id', $id)->count()  < 1) {
            $this->error('Sorry: image was not found');
        }

        Images::where('id', $id)->delete();

        $this->success('image deleted successfull');
    }
}
