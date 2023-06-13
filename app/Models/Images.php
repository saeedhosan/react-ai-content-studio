<?php

namespace App\Models;

use WeDevs\ORM\Eloquent\Model;

class Images extends Model
{

    /**
     * Name for table without prefix
     * @var string
     */
    protected $table = 'app_images';

    /**
     * Columns that can be edited - IE not primary key or timestamps if being used
     */
    protected $fillable = [
        'uid',
        'user_id',
        'subscription_id',
        'url',
        'path',
        'name',
        'type',
        'size',
        'title',
        'resolution',
        'options',
        'data',
        'description',
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
}
