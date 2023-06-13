<?php

namespace App\helpers;

use App\Models\User;
use App\config\Settings;
use App\Models\Subscriptions;

class Helpers
{

    protected $mime_types = [
        'video/3gpp2' => '3g2',
        'video/3gp' => '3gp',
        'video/3gpp' => '3gp',
        'application/x-compressed' => '7zip',
        'audio/x-acc' => 'aac',
        'audio/ac3' => 'ac3',
        'application/postscript' => 'ai',
        'audio/x-aiff' => 'aif',
        'audio/aiff' => 'aif',
        'audio/x-au' => 'au',
        'video/x-msvideo' => 'avi',
        'video/msvideo' => 'avi',
        'video/avi' => 'avi',
        'application/x-troff-msvideo' => 'avi',
        'application/macbinary' => 'bin',
        'application/mac-binary' => 'bin',
        'application/x-binary' => 'bin',
        'application/x-macbinary' => 'bin',
        'image/bmp' => 'bmp',
        'image/x-bmp' => 'bmp',
        'image/x-bitmap' => 'bmp',
        'image/x-xbitmap' => 'bmp',
        'image/x-win-bitmap' => 'bmp',
        'image/x-windows-bmp' => 'bmp',
        'image/ms-bmp' => 'bmp',
        'image/x-ms-bmp' => 'bmp',
        'application/bmp' => 'bmp',
        'application/x-bmp' => 'bmp',
        'application/x-win-bitmap' => 'bmp',
        'application/cdr' => 'cdr',
        'application/coreldraw' => 'cdr',
        'application/x-cdr' => 'cdr',
        'application/x-coreldraw' => 'cdr',
        'image/cdr' => 'cdr',
        'image/x-cdr' => 'cdr',
        'zz-application/zz-winassoc-cdr' => 'cdr',
        'application/mac-compactpro' => 'cpt',
        'application/pkix-crl' => 'crl',
        'application/pkcs-crl' => 'crl',
        'application/x-x509-ca-cert' => 'crt',
        'application/pkix-cert' => 'crt',
        'text/css' => 'css',
        'text/x-comma-separated-values' => 'csv',
        'text/comma-separated-values' => 'csv',
        'application/vnd.msexcel' => 'csv',
        'application/x-director' => 'dcr',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/x-dvi' => 'dvi',
        'message/rfc822' => 'eml',
        'application/x-msdownload' => 'exe',
        'video/x-f4v' => 'f4v',
        'audio/x-flac' => 'flac',
        'video/x-flv' => 'flv',
        'image/gif' => 'gif',
        'application/gpg-keys' => 'gpg',
        'application/x-gtar' => 'gtar',
        'application/x-gzip' => 'gzip',
        'application/mac-binhex40' => 'hqx',
        'application/mac-binhex' => 'hqx',
        'application/x-binhex40' => 'hqx',
        'application/x-mac-binhex40' => 'hqx',
        'text/html' => 'html',
        'image/x-icon' => 'ico',
        'image/x-ico' => 'ico',
        'image/vnd.microsoft.icon' => 'ico',
        'text/calendar' => 'ics',
        'application/java-archive' => 'jar',
        'application/x-java-application' => 'jar',
        'application/x-jar' => 'jar',
        'image/jp2' => 'jp2',
        'video/mj2' => 'jp2',
        'image/jpx' => 'jp2',
        'image/jpm' => 'jp2',
        'image/jpeg' => 'jpeg',
        'image/pjpeg' => 'jpeg',
        'application/x-javascript' => 'js',
        'application/json' => 'json',
        'text/json' => 'json',
        'application/vnd.google-earth.kml+xml' => 'kml',
        'application/vnd.google-earth.kmz' => 'kmz',
        'text/x-log' => 'log',
        'audio/x-m4a' => 'm4a',
        'application/vnd.mpegurl' => 'm4u',
        'audio/midi' => 'mid',
        'application/vnd.mif' => 'mif',
        'video/quicktime' => 'mov',
        'video/x-sgi-movie' => 'movie',
        'audio/mpeg' => 'mp3',
        'audio/mpg' => 'mp3',
        'audio/mpeg3' => 'mp3',
        'audio/mp3' => 'mp3',
        'video/mp4' => 'mp4',
        'video/mpeg' => 'mpeg',
        'application/oda' => 'oda',
        'application/vnd.oasis.opendocument.text' => 'odt',
        'application/vnd.oasis.opendocument.spreadsheet' => 'ods',
        'application/vnd.oasis.opendocument.presentation' => 'odp',
        'audio/ogg' => 'ogg',
        'video/ogg' => 'ogg',
        'application/ogg' => 'ogg',
        'application/x-pkcs10' => 'p10',
        'application/pkcs10' => 'p10',
        'application/x-pkcs12' => 'p12',
        'application/x-pkcs7-signature' => 'p7a',
        'application/pkcs7-mime' => 'p7c',
        'application/x-pkcs7-mime' => 'p7c',
        'application/x-pkcs7-certreqresp' => 'p7r',
        'application/pkcs7-signature' => 'p7s',
        'application/pdf' => 'pdf',
        'application/octet-stream' => 'pdf',
        'application/x-x509-user-cert' => 'pem',
        'application/x-pem-file' => 'pem',
        'application/pgp' => 'pgp',
        'application/x-httpd-php' => 'php',
        'application/php' => 'php',
        'application/x-php' => 'php',
        'text/php' => 'php',
        'text/x-php' => 'php',
        'application/x-httpd-php-source' => 'php',
        'image/png' => 'png',
        'image/x-png' => 'png',
        'application/powerpoint' => 'ppt',
        'application/vnd.ms-powerpoint' => 'ppt',
        'application/vnd.ms-office' => 'ppt',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
        'application/x-photoshop' => 'psd',
        'image/vnd.adobe.photoshop' => 'psd',
        'audio/x-realaudio' => 'ra',
        'audio/x-pn-realaudio' => 'ram',
        'application/x-rar' => 'rar',
        'application/rar' => 'rar',
        'application/x-rar-compressed' => 'rar',
        'audio/x-pn-realaudio-plugin' => 'rpm',
        'application/x-pkcs7' => 'rsa',
        'text/rtf' => 'rtf',
        'text/richtext' => 'rtx',
        'video/vnd.rn-realvideo' => 'rv',
        'application/x-stuffit' => 'sit',
        'application/smil' => 'smil',
        'text/srt' => 'srt',
        'image/svg+xml' => 'svg',
        'application/x-shockwave-flash' => 'swf',
        'application/x-tar' => 'tar',
        'application/x-gzip-compressed' => 'tgz',
        'image/tiff' => 'tiff',
        'text/plain' => 'txt',
        'text/x-vcard' => 'vcf',
        'application/videolan' => 'vlc',
        'text/vtt' => 'vtt',
        'audio/x-wav' => 'wav',
        'audio/wave' => 'wav',
        'audio/wav' => 'wav',
        'application/wbxml' => 'wbxml',
        'video/webm' => 'webm',
        'audio/x-ms-wma' => 'wma',
        'application/wmlc' => 'wmlc',
        'video/x-ms-wmv' => 'wmv',
        'video/x-ms-asf' => 'wmv',
        'application/xhtml+xml' => 'xhtml',
        'application/excel' => 'xl',
        'application/msexcel' => 'xls',
        'application/x-msexcel' => 'xls',
        'application/x-ms-excel' => 'xls',
        'application/x-excel' => 'xls',
        'application/x-dos_ms_excel' => 'xls',
        'application/xls' => 'xls',
        'application/x-xls' => 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
        'application/vnd.ms-excel' => 'xlsx',
        'application/xml' => 'xml',
        'text/xml' => 'xml',
        'text/xsl' => 'xsl',
        'application/xspf+xml' => 'xspf',
        'application/x-compress' => 'z',
        'application/x-zip' => 'zip',
        'application/zip' => 'zip',
        'application/x-zip-compressed' => 'zip',
        'application/s-compressed' => 'zip',
        'multipart/x-zip' => 'zip',
        'text/x-scriptzsh' => 'zsh',
    ];
    /**
     * api error response
     */
    public function error(string $message, int $code = 200)
    {
        wp_send_json([
            'success' => false,
            'message' => $message,
        ], $code);
    }

    /**
     * check subscribe
     */
    public function subscribe()
    {
        if (!Subscriptions::activeSubscription()) {
            $this->error('You don\'t have active subscription please choose a plan and upgrade');
        }
    }

    /**
     * check is can 
     */

    public function canGenererateWords()
    {
        if (Subscriptions::activeSubscription()->words() < 1) {
            $this->error('You have no more words available. You should upgrade plan!');
        }
    }

    /**
     * check for images
     */
    public function canGenererateImage()
    {
        if (Subscriptions::activeSubscription()->images() < 1) {
            $this->error('You have no more available images. You should upgrade plan!');
        }
    }

    /**
     * api success response
     */
    public function success($data, $code = 200)
    {

        if (gettype($data) === 'string') {
            wp_send_json([
                'success' => true,
                'message' => $data,
            ]);
        } else {
            $data['success'] = true;
            wp_send_json($data, $code);
        }
    }

    /**
     * check is base64 stripe
     *
     */
    public function IsBase64($data)
    {
        $decoded_data = base64_decode($data, true);
        $encoded_data = base64_encode($decoded_data);
        if ($encoded_data != $data) {
            return false;
        } else if (!ctype_print($decoded_data)) {
            return false;
        }

        return true;
    }

    /**
     * clear
     */
    public function clean($string)
    {
        // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.

        $string = preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
    }

    /**
     * make seo friendly url
     */
    public function seo_friendly_url($string)
    {
        $string = str_replace(array('[\', \']'), '', $string);
        $string = preg_replace('/\[.*\]/U', '', $string);
        $string = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $string);
        $string = htmlentities($string, ENT_COMPAT, 'utf-8');
        $string = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $string);
        $string = preg_replace(array('/[^a-z0-9]/i', '/[-]+/'), '-', $string);
        return strtolower(trim($string, '-'));
    }

    /**
     * wp block reander to html
     */
    public function render_post_block($content)
    {
        $content = apply_filters('the_content', $content);
        $content = str_replace(']]>', ']]&gt;', $content);
        return $content;
    }

    /**
     * get client ip address
     */
    public function get_client_ip()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        } else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } else if (isset($_SERVER['HTTP_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        } else if (isset($_SERVER['REMOTE_ADDR'])) {
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        } else {
            $ipaddress = 'UNKNOWN';
        }

        return $ipaddress;
    }

    /**
     * wp upload file from base64 string
     */
    public function upload_base64_image($base64_img, $title = 'image', $extension = 'png')
    {
        try {
            //HANDLE UPLOADED FILE
            if (!function_exists('wp_handle_sideload')) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            // Without that I'm getting a debug error!?
            if (!function_exists('wp_get_current_user')) {
                require_once ABSPATH . 'wp-includes/pluggable.php';
            }

            $filename = time() . '-' . $this->seo_friendly_url($title) . '.' . $extension;

            $upload_dir = wp_upload_dir();
            $upload_path = str_replace('/', DIRECTORY_SEPARATOR, $upload_dir['path']) . DIRECTORY_SEPARATOR;

            $img = str_replace('data:image/' . $extension . ';base64,', '', $base64_img);
            $img = str_replace(' ', '+', $img);
            $decoded = base64_decode($img);
            $file_type = 'image/' . $extension;

            // Save the image in the uploads directory.
            file_put_contents($upload_path . $filename, $decoded);

            $attachment = array(
                'post_mime_type' => $file_type,
                'post_author' => User::userid() ?? 1,
                'post_title' => preg_replace('/\.[^.]+$/', '', basename($title)),
                'post_content' => $title,
                'post_status' => 'inherit',
                'guid' => $upload_dir['url'] . '/' . $filename,
            );

            $filepath = $upload_dir['path'] . '/' . $filename;

            $attach_id = wp_insert_attachment($attachment, $filepath);

            // update medatata, regenerate image sizes
            if (!function_exists('wp_crop_image')) {

                require_once ABSPATH . 'wp-admin/includes/image.php';
            }

            wp_update_attachment_metadata(
                $attach_id,
                wp_generate_attachment_metadata($attach_id, $filepath)
            );

            return wp_get_attachment_url($attach_id);
        } catch (\Throwable $th) {
            return 'error.png';
        }
    }

    /**
     * check authrize
     */
    public function authrize($request = null)
    {
        $nonce = '';
        if (array_key_exists('x_wp_nonce', $request->get_headers()) && count($request->get_headers()['x_wp_nonce']) > 0) {
            $nonce = $request->get_headers()['x_wp_nonce'][0];
        }

        if (is_user_logged_in() && wp_verify_nonce($nonce, 'wp_rest')) {
            return true;
        }

        $this->error('Unauthenticated');
    }

    /**
     * make open api request
     */
    public function openai(string $url, array $data)
    {
        $api_key = Settings::backend('openai_key');
        $baseurl = 'https://api.openai.com/v1';
        $sendurl = $baseurl . $url;
        //make request
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $sendurl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $api_key ?? '',
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $response = curl_exec($ch);
        $response = json_decode($response);

        curl_close($ch);

        return $response;
    }

    /**
     * This function uploads from a URL.
     * To upload from a local file path instead
     * @see: https://gist.github.com/RadGH/3b544c827193927d1772
     *
     * Example usage: Upload photo from URL, display the attachment as as html <img>
     *   $attachment_id = rs_upload_from_url( "http://example.com/images/photo.png" );
     *   echo wp_get_attachment_image( $attachment_id, 'large' );
     */

    /**
     * Upload a file to the media library using a URL.
     *
     * @version 1.2
     *
     * @param string $url         URL to be uploaded
     * @param null|string $title  If set, used as the post_title
     *
     * @return int|false
     */
    public function wp_upload_from_url($url, $title = null)
    {
        require_once ABSPATH . "/wp-load.php";
        require_once ABSPATH . "/wp-admin/includes/image.php";
        require_once ABSPATH . "/wp-admin/includes/file.php";
        require_once ABSPATH . "/wp-admin/includes/media.php";

        // Download url to a temp file
        $tmp = download_url($url);
        // return $tmp;
        // if (is_wp_error($tmp)) return false;

        // Get the filename and extension ("photo.png" => "photo", "png")
        $filename = pathinfo($url, PATHINFO_FILENAME);
        $extension = pathinfo($url, PATHINFO_EXTENSION);

        // An extension is required or else WordPress will reject the upload
        if (!$extension) {
            // Look up mime type, example: "/photo.png" -> "image/png"
            $mime = mime_content_type($tmp);
            $mime = is_string($mime) ? sanitize_mime_type($mime) : false;

            // Only allow certain mime types because mime types do not always end in a valid extension (see the .doc example below)
            $mime_extensions = array(
                // mime_type         => extension (no period)
                'text/plain' => 'txt',
                'text/csv' => 'csv',
                'application/msword' => 'doc',
                'image/jpg' => 'jpg',
                'image/jpeg' => 'jpeg',
                'image/gif' => 'gif',
                'image/png' => 'png',
                'video/mp4' => 'mp4',
            );

            if (isset($mime_extensions[$mime])) {
                // Use the mapped extension
                $extension = $mime_extensions[$mime];
            } else {
                // Could not identify extension
                @unlink($tmp);
                return false;
            }
        }

        // Upload by "sideloading": "the same way as an uploaded file is handled by media_handle_upload"
        $args = array(
            'name' => "$filename.$extension",
            'tmp_name' => $tmp,
        );

        // Do the upload
        $attachment_id = media_handle_sideload($args, 0, $title);

        // Cleanup temp file
        @unlink($tmp);

        // Error uploading
        if (is_wp_error($attachment_id)) {
            return false;
        }

        // Success, return attachment ID (int)
        return (int) $attachment_id;
    }

    /**
     * wp upload ajax file
     */
    public function wp_upload_ajax($name)
    {
        if (!isset($_FILES[$name])) {
            return null;
        }

        //HANDLE UPLOADED FILE
        if (!function_exists('wp_handle_sideload')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        // Without that I'm getting a debug error!?
        if (!function_exists('wp_get_current_user')) {
            require_once ABSPATH . 'wp-includes/pluggable.php';
        }

        $file_name = $_FILES[$name]['name'];
        $file_type = $_FILES[$name]['type'];
        $file_size = $_FILES[$name]['size'];
        $file_temp = $_FILES[$name]['tmp_name'];

        $upload_dir = wp_upload_dir();

        $image_data = file_get_contents($file_temp);

        $filename = basename($file_name);

        $filetype = wp_check_filetype($file_name);

        $filename = time() . '.' . $filetype['ext'];

        if (wp_mkdir_p($upload_dir['path'])) {
            $file = $upload_dir['path'] . '/' . $filename;
        } else {
            $file = $upload_dir['basedir'] . '/' . $filename;
        }

        file_put_contents($file, $image_data);

        $attachment = array(
            'post_mime_type' => $filetype['type'],
            'post_title' => preg_replace('/\.[^.]+$/', '', basename($file_name)),
            'post_content' => basename($file_name),
            'post_status' => 'inherit',
            // 'guid'           => $upload_dir['url'] . '/' . $filename
        );

        $attach_id = wp_insert_attachment($attachment, $file);

        require_once ABSPATH . 'wp-admin/includes/image.php';

        $attach_data = wp_generate_attachment_metadata($attach_id, $file);

        wp_update_attachment_metadata($attach_id, $attach_data);

        return wp_get_attachment_url($attach_id);
    }

    /**
     * has_file
     */
    public function has_file($name)
    {
        return isset($_FILES[$name]) ? true : false;
    }

    /**
     * check if file has
     */
    public function allow_mimes($name, $mimes)
    {
        if (!isset($_FILES[$name])) {
            return false;
        }
        $filemime = mime_content_type($_FILES[$name]['tmp_name']);
        $detected = $this->mime_types[$filemime];
        return in_array($detected, $mimes);
    }

    /**
     * limit file size
     */
    public function allow_filesize($name, $size)
    {
        if (!isset($_FILES[$name])) {
            return false;
        }

        return $_FILES[$name]['size'] < $size ? true : false;
    }


    function isNegative($value)
    {
        if (isset($value)) {
            if ((int)$value > 0) {
                return false;
            }
            return (int)$value < 0 && substr(strval($value), 0, 1) === "-";
        }
    }
}
