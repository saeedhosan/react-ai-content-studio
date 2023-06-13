<?php

namespace App\Controllers\Api;

use App\Models\Plans;

class PlanController
{
    public function all($request = null)
    {
        $id = $request->get_param('id');
        if ($id) {
            wp_send_json(Plans::find($id));
        } else {
            wp_send_json(Plans::all()->toArray());
        }

        //print_r(Plans::all()->toArray());
    }
}
