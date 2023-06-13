<?php

namespace App\Models;

use WeDevs\ORM\Eloquent\Model;

class Plans extends Model
{
    /**
     * Name for table without prefix
     * @var string
     */
    protected $table = 'app_plans';

    /**
     * Columns that can be edited - IE not primary key or timestamps if being used
     */
    protected $fillable = [
        'uid',
        'user_id',
        'name',
        'slug',
        'words',
        'image',
        'description',
        'price',
        'billing_cycle',
        'frequency_unit',
        'items',
        'options',
        'status',
        'custom_order',
        'is_default',
        'is_popular',
    ];


    /** Everything below this is best done in an abstract class that custom tables extend */

    /**
     * Set primary key as ID, because WordPress
     *
     * @var string
     */
    protected $primaryKey = 'id';

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
     * get words
     */
    public function words()
    {
        return isset($this->words) ? intval($this->words) : 0;
    }
    /**
     * get images
     */
    public function image()
    {
        return isset($this->image) ? intval($this->image) : 0;
    }

    /**
     * billing_cycle
     */
    public function billing_cycle()
    {
        return isset($this->billing_cycle) ? $this->billing_cycle : 'monthly';
    }

    /**
     * frequency_unit
     */ public function frequency_unit()
    {
        return isset($this->frequency_unit) ? intval($this->frequency_unit) : 1;
    }

    /***
     * set subscription end time
     */
    public function end_date()
    {
        $cycle = 30;
        switch ($this->billing_cycle()) {
            case 'monthly':
                $cycle = 30;
                break;
            case 'day':
                $cycle = 1;
                break;
            case 'weekly':
                $cycle = 7;
                break;
            case 'yearly':
                $cycle = 366;
                break;

            default:
                $cycle = 30;
                break;
        }

        $days = $cycle * $this->frequency_unit();

        return  date('Y-m-d H:i:s', strtotime("+$days day"));
    }

    /**
     * plans start now
     */
    public function start_date()
    {
        return date('Y-m-d H:i:s');
    }

    public static function default()
    {
        if (self::where('is_default', true)->count() > 0) {
            return self::where('is_default', true)->first();
        } else {
            return self::first();
        }
    }
}
