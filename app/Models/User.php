<?php

namespace App\Models;

use WeDevs\ORM\Eloquent\Model;

class User extends Model
{
    /**
     * Name for table without prefix
     * @var string
     */
    protected $table = 'users';


    /**
     * Overide parent method to make sure prefixing is correct.
     *
     * @return string
     */
    public function getTable()
    {
        // In this example, it's set, but this is better in an abstract class
        if (isset($this->table)) {
            $prefix =  $this->getConnection()->db->prefix;

            return $prefix . $this->table;
        }

        return parent::getTable();
    }


    /**
     * check if user login
     */
    public static function isLogin()
    {
        if (is_user_logged_in()) {
            return true;
        } else {
            return  false;
        }
    }


    /**
     * get user is login
     */
    public static function get()
    {
        if (self::isLogin()) {
            return wp_get_current_user();
        } else {
            return false;
        }
    }


    /**
     * get current user id
     */
    public static function userid()
    {
        if (self::isLogin()) {
            return wp_get_current_user()->ID;
        }

        return false;
    }
}
