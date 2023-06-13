<?php

namespace App\Controllers\Api;

use App\helpers\Helpers;
use App\Models\Document;
use App\Models\Subscriptions;
use App\Models\User;

class DocumentController extends Helpers
{

    /**
     * open ai client
     */
    protected $client = null;

    /**
     * show all documents are generated
     */
    public function index($request = null)
    {
        //check authrize
        $this->authrize($request);
        $data = Document::where('user_id', User::userid())->orderBy('id', 'DESC')->get();
        return $this->success(['data' => $data]);
    }

    /**
     * create document with open ai and save to database
     */
    public function create($request = null)
    {

        try {

            //authrize
            $this->authrize($request);

            //subcribe
            $this->subscribe();

            //words
            $this->canGenererateWords();

            $parms = $request->get_json_params();
            $model = isset($parms['model']) ? $parms['model'] : 'text-davinci-003';
            $prompt = isset($parms['prompt']) ? $parms['prompt'] : '';
            $max_tokens = isset($parms['max_tokens']) ? intval($parms['max_tokens']) : 0;
            $temperature = isset($parms['temperature']) ? $parms['temperature'] : 0;
            $number_of = isset($parms['number_of']) ? intval($parms['number_of']) : 1;


            //blog name
            $blog_name = isset($parms['blog_name']) ? $parms['blog_name'] : 'name';
            $docs_name = isset($parms['docs_name']) ? $parms['docs_name'] : 'New Document';
            $template = isset($parms['template']) ? $parms['template'] : '';


            $makePrompt = "write $template about $prompt";

            $data = [
                "model" => 'text-davinci-003',
                "prompt" => $makePrompt,
                "max_tokens" => $max_tokens,
                "temperature" => intval('0.7'),
                // "n"            => $number_of,
            ];

            $response = $this->openai('/completions', $data);

            // check if error response
            if ($response->error) {
                $this->error($response->error->message);
            }

            //get generated text
            $text       = $response->choices[0]->text;

            $html       = nl2br($text);

            $str_len    = strlen(preg_replace('/[^a-zA-Z0-9]/i', '', $text));

            if ($text && !empty($text)) {
                $save = Document::create([
                    'user_id'       =>  User::userid(),
                    'blog_name'     => $blog_name,
                    'docs_name'     => $docs_name,
                    'blog_title'    => $template,
                    'word_used'     => $str_len,
                    'discription'   => $makePrompt,
                    'html'          => $html,
                    'response'      => json_encode($response)
                ]);

                Subscriptions::activeSubscription()->decressdWords($str_len);

                if ($save) {
                    if ($save) {
                        $this->success([
                            'success' => true,
                            'message' => 'text generated successfully!',
                            'document' => $save,
                            'word_used' => $str_len,
                            'html'    => $html,
                        ]);
                    } else {
                        $this->error('faild to generate!');
                    }
                }
            }

            $this->error('Somthing went wrong please again later');

            //done        
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }


    /**
     * create document with open ai and save to database
     */
    public function delete($request = null)
    {
        try {
            //authrize
            $this->authrize($request);

            $parms = $request->get_json_params();
            $id = isset($parms['id']) ? $parms['id'] : '';

            if (empty($id)) {
                $this->error('somthing went worng  docuemnt id not found!');
            }

            if (Document::where('id', $id)->count() < 1) {
                $this->error('Someting went worng document not fund by this id!');
            }

            $delete = Document::where('id', $id)->delete();

            if ($delete) {
                $this->success('document deleted successfull!');
            }

            $this->error('Something went wrong please try again laters');

            //done        
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }


    /**
     * archive means view the document
     */
    public function archive($request = null)
    {
        try {
            //authrize
            $this->authrize($request);

            $parms = $request->get_json_params();
            $id = isset($parms['id']) ? $parms['id'] : '';

            if (empty($id)) {
                $this->error('somthing went worng  docuemnt id not found!');
            }

            if (Document::where('id', $id)->count() < 1) {
                $this->error('Someting went worng document not fund by this id!');
            }

            $archive = Document::find($id);

            $this->success(['archive' => $archive]);

            $this->error('Something went wrong please try again laters');

            //done        
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }


    /**
     * update document 
     */
    public function update($request = null)
    {
        try {
            //authrize
            $this->authrize($request);

            $parms = $request->get_json_params();
            $id = isset($parms['id']) ? $parms['id'] : '';

            if (empty($id)) {
                $this->error('somthing went worng  docuemnt id not found!');
            }

            if (Document::where('id', $id)->count() < 1) {
                $this->error('Someting went worng document not fund by this id!');
            }

            $archive = Document::find($id);



            $blog_name = isset($parms['blog_name']) ? $parms['blog_name'] : $archive->blog_name;
            $blog_title = isset($parms['blog_title']) ? $parms['blog_title'] : $archive->blog_title;
            $docs_name = isset($parms['docs_name']) ? $parms['docs_name'] : $archive->docs_name;
            $description = isset($parms['description']) ? $parms['description'] : $archive->description;
            $text = isset($parms['text']) ? $parms['text'] : $archive->text;
            $html = isset($parms['html']) ? $parms['html'] : $archive->html;

            $update = Document::where('id', $id)->update([
                'blog_name' => $blog_name,
                'blog_title' => $blog_title,
                'docs_name' => $docs_name,
                'description' => $description,
                'text' => $text,
                'html' => $html,
            ]);

            if ($update) {
                $this->success('document save successfull!');
            }

            $this->error('Something went wrong please try again laters');

            //done        
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }
    }
}
